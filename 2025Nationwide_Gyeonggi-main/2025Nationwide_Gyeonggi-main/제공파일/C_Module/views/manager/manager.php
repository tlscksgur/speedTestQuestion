<?php  ?>
<section>
  <?php foreach($libraryData as $libData): ?>
  <form action="/eventAdd" method="post" enctype="multipart/form-data">
    <table>
      <tr>
        <th>도서관명</th>
        <td><input type="text" name="libraryName" value="<?= $libData -> library_name ?>"></td>
      </tr>
      <tr>
        <th>시작일</th>
        <td><input type="text" name="startDay"></td>
      </tr>
      <tr>
        <th>종료일</th>
        <td><input type="text" name="endDay"></td>
      </tr>
      <tr>
        <th>행사명</th>
        <td><input type="text" name="eventName"></td>
      </tr>
      <tr>
        <th>행사이미지</th>
        <td><input type="text" name="eventImg"></td>
      </tr>
      <tr>
        <td colspan="2" align="center"><input type="submit" value="등록"></td>
      </tr>
    </table>
  </form>
  <?php endforeach; ?>
</section>