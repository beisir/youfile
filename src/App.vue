<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style>
  .el-pagination{
    padding: 30px 0;
  }
  label{
    font-weight: normal
  }
  .block .el-form-item__content input, .block .el-form-item__content select{
    width: 200px;
  }
 /* .block .el-form-item--small,.block .el-form--inline .el-form-item{
    width: 100%
  } */
</style>

