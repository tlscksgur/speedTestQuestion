<?php $books = DB::fetchAll("select * from books") ?>

<section class="eBookContainer">
  <div class="background">
    <img src="./공통제공파일/image/5.jpg" alt="backgroundImg" />
  </div>
  <div class="eBookFilter">
    <select id="cate">
      <option value="전체">전체</option>
      <option value="사회과학">사회과학</option>
      <option value="자연과학">자연과학</option>
      <option value="예술">예술</option>
      <option value="언어">언어</option>
      <option value="문학">문학</option>
      <option value="역사">역사</option>
      <option value="기술과학">기술과학</option>
      <option value="철학">철학</option>
    </select>
  </div>
  <div class="eBookContent">
    <?php foreach ($books as $i => $book) { ?>
      <div class="albumContentBox" style="text-align:center; ">
        <img class="albumImg" src="./library_books/<?= $book->image ?>" alt="<?= $book->name ?>">
        <h5 class="albumName"><?= $book->name ?></h5>
        <button data-idx="<?= $i ?>">e-book보기</button>
    <?php }?>
  </div>
  
  <div class="eBookModal">
    <div class="eBookflexBox flex fd spaceB">
      <div class="eBookTitle">
        <h2>온라인 도서 읽기 / read e-book</h2>
        <span class="dottedLine"></span>
        <button class="close fwB fz22">X</button>
      </div>
      <div class="infoFlex flex spaceB">
        <div class="eBookInfo">
          <span class="bookTitle"></span>
          <span class="bookPage"></span>
        </div>
        <div class="pageBtn">
          <span class="backPageBtn bnp cursor">이전 페이지</span>
          <span class="nextPageBtn bnp cursor">다음 페이지</span>
        </div>
      </div>

      <div class="textContent"></div>
    </div>
  </div>
</section>

<script src="./js/ebook.js"></script>