<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>광주전국경기기능대회</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./공통제공파일/fontawesome/css/all.css" />
  <script src="./js/lib.js"></script>
</head>

<body>
  <div class="container">
    <header>
      <div class="header-logo">
        <a href="./index.html">
          <img src="./img/logo/realLogo.png" alt="logo" title="logo" />
        </a>
      </div>
      <div class="header-flex">
        <ul class="nav1">
          <li><a href="#">도서이용</a></li>
          <li><a href="#">신청 및 참여</a></li>
          <li><a href="/ebook">E-Book</a></li>
          <li><a href="/library">도서관 찾기</a></li>
        </ul>
        <ul class="nav2">
          <?php if(!ss()): ?>
          <li><a href="/login">로그인</a></li>
          <li><a href="/join">회원가입</a></li>
          <?php elseif(ss()->id === 'admin'): ?>
            <li><a href="/"><?= ss()->id ?></a></li>
            <li><a href="/books">도서관리</a></li>  
          <li><a href="/logout">로그아웃</a></li>
          <?php elseif(ss()->id === 'manager'): ?>
            <li><a href="/"><?= ss()->id ?></a></li>
          <li><a href="/manager">행사관리</a></li>
          <li><a href="/logout">로그아웃</a></li>
          <?php else: ?>
          <li><a href="/"><?= ss()->id ?></a></li>
          <li><a href="/mypage">마이페이지</a></li>
          <li><a href="/logout">로그아웃</a></li>
          <?php endif; ?>
        </ul>
      </div>
    </header>