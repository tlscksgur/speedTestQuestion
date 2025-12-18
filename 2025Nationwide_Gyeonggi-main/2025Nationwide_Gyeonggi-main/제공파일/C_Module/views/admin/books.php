<section class="eBookContainer">
  <div class="background">
    <img src="./공통제공파일/image/5.jpg" alt="backgroundImg" />
  </div>

  <div class="bookAddBox">
    <form action="/bookAdd" method="post" id="table" class="bookAdd" enctype="multipart/form-data">
      <input type="hidden" name="idx" id="idx">
      <input type="hidden" id="date" name="date">
      <input type="hidden" name="oldImage" id="oldImage">
      <table>
        <tr>
          <th>제목</th>
          <td><input type="text" id="name" name="name"></td>
        </tr>
        <tr>
          <th>작가</th>
          <td><input type="text" id="author" name="author"></td>
        </tr>
        <!-- <tr>
          <th>카테고리</th>
          <td><input type="text" id="cate" name="cate"></td>
        </tr> -->
        <tr>
          <th>카테고리</th>
          <td>
            <select name="cate" id="cate">
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
          </td>
        </tr>
        <tr>
          <th>줄거리</th>
          <td><input type="text" id="intro" name="intro"></td>
        </tr>
        <tr>
          <th>표지</th>
          <td><input type="file" id="image" name="image"></td>
        </tr>
        <tr>
          <td colspan="2" class="submitTd" style="text-align: center;">
            <input type="submit" class="txtChange" value="등록">
          </td>
        </tr>
      </table>
    </form>
  </div>

  <div class="eBookFilter">
    <select id="category">
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
      <form action="/removeBook" method="post" class="form">
        <input type="hidden" name="idx" value="<?= $book -> idx ?>">
        <input type="hidden" name="cate" value="<?= $book -> cate ?>">
        <input type="hidden" name="name" value="<?= $book -> name ?>">
        <input type="hidden" name="author" value="<?= $book -> author ?>">
        <input type="hidden" name="image" value="<?= $book -> image ?>">
        <input type="hidden" name="date" value="<?= $book -> date ?>">
        <input type="hidden" name="intro" value="<?= $book -> intro ?>">

        <div class="albumContentBox" style="text-align:center;">
          <img class="albumImg" src="./library_books/<?= $book->image ?>" alt="<?= $book->name ?>">
          <h5 class="albumName"><?= $book->name ?></h5>
          <button type="button" class="fixBtn" data-fixIdx="<?= $i ?>">수정</button>
          <button type="submit" data-removeIdx="<?= $i ?>">삭제</button>
        </div>
      </form>
    <?php } ?>
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

<script>
  const $fixBtn = $$('.fixBtn');

  $fixBtn.forEach((fb) => {
    fb.onclick = () => {
      const $form = fb.closest('form')

      const $idx = $form.querySelector('[name="idx"]').value
      const $cate = $form.querySelector('[name="cate"]').value
      const $name = $form.querySelector('[name="name"]').value
      const $author = $form.querySelector('[name="author"]').value
      const $date = $form.querySelector('[name="date"]').value
      const $intro = $form.querySelector('[name="intro"]').value

      $('#idx').value = $idx;
      $('#cate').value = $cate;
      $('#name').value = $name;
      $('#author').value = $author;
      $('#date').value = $date;
      $('#intro').value = $intro;

      const fixForm = $('.bookAdd')
      fixForm.setAttribute('action', '/fixBook');
      $('.txtChange').value = "수정";

      const tdBox = $('.submitTd')
      if(!document.querySelector('.deleteBtn')){
        const delBtn = newEl('button', {
          type: 'button',
          className: 'deleteBtn',
          textContent: '취소'
        })

        tdBox.append(delBtn)

        delBtn.onclick = () => {
          const $formInInputValue = $$('.bookAdd input[type="text"]')
          
          $formInInputValue.forEach(input => {
            input.value = ""
          })
          delBtn.remove();
        }

      }
      
      

      console.log("scroll");
      fixForm.scrollIntoView({behavior: "smooth"});
    }
  })

  function validation() {
    
  }

</script>