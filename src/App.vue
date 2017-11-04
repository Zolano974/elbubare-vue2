<template>
  <div id="app">
    <img src="/static/uploads/medias/2017-08-12-12-07-59-kaya.jpg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import '../node_modules/bulma/css/bulma.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
