<template>
  <div>
    <el-upload
      class="upload-demo"
      action="#"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :http-request="upload"
      :show-file-list="false"
      >
      <el-button style="margin: 10px;" type="primary" size="mini">导入</el-button>  
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'FrontImport',

  data() {
    return {
      
    };
  },

  methods: {
    upload({ file }) {
      console.log(file);
    }
  },
};
</script>

<style lang="scss" scoped>

</style>