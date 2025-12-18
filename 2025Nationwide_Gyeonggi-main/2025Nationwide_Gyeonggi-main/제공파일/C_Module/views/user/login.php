<section class="loginForm">
  <h2 class="tac">로그인</h2>
  <form action="/login" method="post">

    <div class="inputBox idInput">
      <input type="text" name="id" id="id" placeholder="id" required>
    </div>
    
    <div class="inputBox pwInput">
      <input type="password" name="pw" id="pw" placeholder="pw" required>
    </div>

    <input type="submit" value="로그인" />
  </form>
</section>