<template>
  <div id="app">
    <router-view />
    <to-top></to-top>
  </div>
</template>

<style lang='less'>
html,body,#app{
  width:100%;
  height:100%;
}

.width-limit{
  max-width: 1200px;
  margin:auto;
}
</style>
