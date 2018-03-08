<template>
  <div>
    <div class="error-template">
      <h1>
        Oops!</h1>
      <h2>
        404 Not Found</h2>
      <div class="error-details">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div class="error-actions">
        <router-link to="/signin" class="btn btn-primary btn-lg">去登录</router-link>
        <router-link to="/card/apply" class="btn btn-default btn-lg">去申请卡券</router-link>
      </div>
    </div>
  </div>
</template>

<style scope lang="less">
  body {
    background-color: #ffffff;
  }

  .btn {
    height: 40px;
    width: 160px;
    line-height: 40px;
    background-color: #4d8bee;
    border-radius: 30px;
    display: inline-block;
    color: #ffffff;
    padding: 5px 10px;
    &:first-child {
       margin-right: 30px;
     }
  }

  .error-template {
    padding: 40px 15px;
    text-align: center;
    font-size: 14px;
  }

  .error-actions {
    width: 600px;
    margin: 30px auto 0 auto;
    text-align: center;
  }

  h2, .h2 {
    font-size: 30px;
  }

  h1, .h1 {
    font-size: 36px;

  }

  h1, h2 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
