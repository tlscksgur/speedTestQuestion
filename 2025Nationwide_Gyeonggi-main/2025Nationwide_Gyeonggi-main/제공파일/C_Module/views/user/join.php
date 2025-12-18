<section class="joinForm">
  <h2 class="tac">회원가입</h2>
  <form action="/join" method="post" enctype="multipart/form-data">
    <table style="margin: 200px auto;">
      <tr>
        <th>id</th>
        <td>
          <input type="text" name="id" id="id" placeholder="id" required>
          <button type="button" class="vaildation">아이디 중복 확인</button>
        </td>
      </tr>
      <tr>
        <th>pw</th>
        <td><input type="password" name="pw" id="pw" placeholder="pw" required></td>
      </tr>
      <tr>
        <th>name</th>
        <td><input type="text" name="name" id="name" placeholder="name" required></td>
      </tr>
      <tr>
        <th>file</th>
        <td><input type="file" name="img" id="img"></td>
      </tr>
      <tr>
        <td colspan="2" align="center"><input type="submit" value="회원가입" /></td>
      </tr>
    </table>

  </form>
</section>

<script> /* 회원가입 아이디 중복 제거 */
  $('.vaildation').onclick = async () => {
    const data = await $fetch(`/vali/${$('#id').value.trim()}`);
    
    console.log(data);
    if (data.valid) {
      alert('사용 가능한 아이디입니다!');
    } else {
      alert('이미 사용중인 아이디입니다!');
    }
  }
</script>