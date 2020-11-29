<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
<!--        返回键-->
        <span @click="back" class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
<!--    搜索框-->
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        //输入搜索内容
        inputValue:'',
        query: ''
      }
    },
    methods:{
      //路由跳转到搜索页
      toResult(){
        //非空判断
        if(this.inputValue==='')
        {
          this.$message.warning('请输入内容')
        }else{
          this.$router.push('/result?q='+this.inputValue);
          //this.$router.go(0);
        }
      },
      //返回函数
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .icon-wrapper{
    margin-top: 20px;
    margin-left: 10px;
  }
</style>
