<!-- 
  @author:zoujingqiang
  @description:这是标题
-->
<template>
  <div class='me-caption-wrapper width-limit' :class='[type]'>
    <span>
      <!-- <img class='icon' src="@/assets/images/jq/icons.png" alt=""> -->
      <span class='name'>{{titleName}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name:'meCaption',
  props:{
    'title-name':{
      type:String,
      required:true
    },
    'type':{
      type:String,
      default:'label'//label background
    }
  },
}
</script>

<style lang='less' scoped>
// (带标签)
.me-caption-wrapper {
    height     : 40px;
    line-height: 40px;
    font-size  : @font-size-lg;
    position   : relative;
    color      : #000;
    font-weight: bold;
    text-align: left;

    &.label {
        .name {
            &::before {
                content       : '';
                display       : inline-block;
                margin-right  : 10px;
                position      : relative;
                top           : -2px;
                width         : 4px;
                border-radius : 2px;
                height        : 18px;
                vertical-align: middle;
                background    : linear-gradient(to bottom, lighten(@color-primary, 10%) 0%, darken(@color-primary, 6%) 100%);
            }
        }
    }

    &.background {
        border-bottom: 1px solid @border-color;

        .name {
            background: linear-gradient(to right, lighten(@color-primary, 10%) 0%, darken(@color-primary, 6%) 100%);
            color        : @color-inverse;
            display      : inline-block;
            height       : 100%;
            padding-left : 20px;
            padding-right: 10px;
            position     : relative;

            &::after {
                content     : '';
                position    : absolute;
                bottom      : 0;
                right       : -40px;
                width       : 0;
                height      : 0;
                border-style: solid;
                border-width: 39px 0 0 40px;
                border-color: transparent transparent transparent darken(@color-primary, 6%);
            }
        }
    }
}
</style>