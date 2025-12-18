<?php

get('/', function() {
  views('home');
});
get('/join', function() {
  views('user/join');
});
get('/login', function() {
  views('user/login');
});
get('/logout', function() {
  session_destroy();
  move('/');
});
get('/ebook', function() {
  views('ebook');
});
get('/library', function() {
  views('library');
});
get('/manager', function() {
  $libraryData = DB::fetchAll("SELECT * FROM manager");
  views('manager/manager', array(
    "manager" => $libraryData
  ));
});

get('/books', function() {
  $books = DB::fetchAll('select * from books');
  views('admin/books', array(
    "books" => $books
  ));
});

get('/vali/{id}', function($id) {
  $userData = DB::fetchAll("SELECT * FROM user where id = '$id'");
  
  header('Content-type: application/json; chartset=utf-8');
  echo json_encode(["valid" => !$userData]);
});


// --------POST--------
post('/join', function() {
  extract($_POST);                     // $_POST = ['id' => 'cksgur', 'pw' => '1234'] 이런식으로 뽑힘
  $from = $_FILES['img']['tmp_name'];  // **임시폴더**에 저장된 경로를 $from에 담기
  $img = 'uploadProfile/' . time() . $_FILES['img']['name'];
  if(move_uploaded_file($from, $img)) { // 임시폴더에 있는 업로드된 파일을 uploads폴더 안의 최종 파일명으로 옮겨줘
    DB::exec("insert into user (id, pw, name, profileImg) values ('$id', '$pw', '$name', '$img')");
  }else{
    script("프로필 사진을 업로드 해주세요.");
  }
  move('/');
});

post('/login', function() {
  extract($_POST);
  $userID = DB::fetch("select * from user where id = '$id' and pw = '$pw'");
  if (!$userID) return back('아이디 또는 비밀번호를 확인해주세요.');
  $_SESSION['ss'] = $userID;
  move('/', '로그인 성공!');
});

post('/bookAdd', function() {
  extract($_POST);
  $from = $_FILES['image']['tmp_name'];
  $img = $_FILES['image']['name'];

  move_uploaded_file($from, 'uploads/' . $img);

  $bookAdd = DB::exec("insert into books (cate, name, author, date, image, intro) values ('$cate', '$name', '$author', NOW(), '$img', '$intro')");
  move('/books');
});

post('/fixBook', function() {
  extract($_POST);
  $fixBookFind = DB::fetchAll("select * from books where name = '$name' and idx != $idx ");
  if($fixBookFind) return back("같은 이름의 도서가 존재합니다.");

  $from = $_FILES['image']['tmp_name'];
  $img = $_FILES['image']['name'];

  if(move_uploaded_file($from, 'uploads/' . $img)) {
    DB::exec("update books set cate='$cate', name='$name', author='$author', image='$img', date='$date', intro='$intro' where idx=$idx");
  }else{
    DB::exec("update books set cate='$cate', name='$name', author='$author', date='$date', intro='$intro' where idx=$idx");
  }
  move('/books', '수정 성공!');
});

post('/removeBook', function() {
  extract($_POST);
  DB::exec("delete from books where idx = $idx ");

  back("도서가 삭제되었습니다.");
});

post('eventAdd', function(){
  extract($_POST);

  DB::exec("INSERT INTO event (startDay, endDay, eventName, eventImg) values ('$startDay', '$endDay', '$eventName', '$eventImg') ");

  move('/', '이벤트 추가!!!');
});