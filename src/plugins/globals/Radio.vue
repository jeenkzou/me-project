<template>
  <div class="me-radio">
    <!-- <label class="title">{{title}}</label> -->
    <span
       v-for="(item, index) in getOptions"
       :key="index"
       class="radio-link">
      <div class="radio-list">
        <div class="radio-area">
          <label>
            <span>
              <input 
                type="radio"
                :value="item.value"
                class="radio-input"
                v-model="selectedValue"
                :disabled="item.disabled">
              <span class="radio-select"
                :class="item.disabled == true ? 'radio-selectDisabled' : '' ">
              </span>
            </span>
            <span class="select-list-item">{{item.label}}</span>
          </label>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'meRadio',
  data () {
    return {
      selectedValue: ''
    }
  },
  props: {
    value:[String,Number],
    title: String,
    options: [String, Array]
  },
  created () {
    // console.log(typeof (this.options));
    if (typeof (this.options) == 'string') {
      this.options = eval("(" + this.options + ")");
    }
  },
  methods: {
  },
  computed: {
    getOptions(){
      return this.options.reduce((pre,item)=>{
        if(typeof item === 'string'){
          pre.push({
            value:item,
            label:item,
            disabled:false
          })
        }else{
          pre.push(item)
        }
        return pre;
      },[])
    }
  },
  watch: {
    selectedValue () {
      this.$emit('input', this.selectedValue)
    },
    value(nv){
      this.selectedValue = nv
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.me-radio{
  display: inline-block;
}
.title {
  color: #888;
  font-size: 10px;
  text-align: left;
  line-height: 6px;
  display: block;
  padding: 0rem 2px;
}
.radio-link {
  box-sizing: border-box;
  color: inherit;
  /* min-height: 20px; */
  display:inline-block;
  /* overflow: hidden; */
  position: relative;
  text-decoration: none;
  margin-right: 40px;
}

.radio-list {
  height: 10px;
  line-height: 10px;
  width: 100%;
  padding: 0rem 2px;
}

.radio-input {
  display: none;
}

.radio-select {
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid @border-color;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.radio-selectDisabled {
  background-color: @bg-color-disable;
  border-color: @text-color-disable;
  cursor: not-allowed;
}

.radio-input:checked + .radio-select {
  background-color: @color-primary;
  border-color: @color-primary;
}

.radio-input:checked + .radio-select::after {
  background-color: #fff;
  transform: scale(1);
}

.radio-select::after {
  content: ' ';
  border-radius: 100%;
  top: 5px;
  left: 5px;
  position: absolute;
  width: 8px;
  height: 8px;
  transition: transform 0.2s;
  transform: scale(0);
}
label{
  font-weight: normal;
}
.select-list-item {
  vertical-align: middle;
  margin-left: 4px;
  color:@text-color-primary;
}
</style>
