<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.el-pagination {
  padding: 30px 0;
}
label {
  font-weight: normal;
}
.block .el-form-item__content input,
.block .el-form-item__content select {
  width: 200px;
}
.el-alert--info {
  margin-bottom: 20px;
}
.submit-btn {
  text-align: center;
  padding: 20px;
}
.block {
  border: 1px solid #ededde;
  margin-top: 20px;
}
.block .demo-form-inline {
  padding: 0;
}
.block .clearfix {
  border-bottom: 1px solid #ededde;
  border-top: 1px solid #ededde;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
.block .ser-sel {
  position: absolute;
  background: #fff;
  max-height: 250px;
  overflow: hidden;
  overflow: auto;
  width: 100%;
  z-index: 100;
  border: 1px solid #dcdfe6;
}
.block .ser-sel .has-gutter {
  display: none;
}
.block .el-tabs__nav-scroll {
  padding-left: 30px;
}
.block .ser-sel button {
  border: none;
}
.block .el-tabs__nav {
  padding-bottom: 10px;
}
.block .el-tabs__header {
  margin: 0 0 35px;
}
.block .el-input {
  display: block;
  width: 180px;
}
.form-input .el-form-item--medium .el-form-item__content {
  width: 180px;
}
.jv-container .jv-code {
  padding: 0;
}
.el-input.is-disabled .el-input__inner {
  color: #333;
}
.el-button--medium{
  margin-bottom: 22px;
}
</style>

