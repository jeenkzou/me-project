<template>
  <div id="app">
   <p class='text-a-c'>
      <img alt="logo" src="@/assets/logo.png">
    </p>
    <router-view />
    <p class='text-a-c'>
      <img alt="logo" src="@/assets/logo.png">
    </p>
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
