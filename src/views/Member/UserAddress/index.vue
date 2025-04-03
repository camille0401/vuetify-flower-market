<template>
  <div class="fs-member-useraddress-container">
    <div class="add-btns">
      <el-button type="primary">添加收货地址</el-button>
    </div>

    <!-- list -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="consignee" label="收货人" width="180" />
      <el-table-column prop="address" label="收获地址" width="180" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small">
            Edit
          </el-button>
          <el-button size="small" type="danger">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  {
    consignee: 'lucy',
    address: '浙江杭州市西湖区秋雅元',
    phone: '189****0909',
  },
  {
    consignee: 'lucy',
    address: '浙江杭州市西湖区秋雅元',
    phone: '189****0909',
  },
  {
    consignee: 'lucy',
    address: '浙江杭州市西湖区秋雅元',
    phone: '189****0909'
  },
  {
    consignee: 'lucy',
    address: '浙江杭州市西湖区秋雅元',
    phone: '189****0909',
  },
])
</script>

<style lang="scss" scoped>
.fs-member-useraddress-container {
  background: #fff;
  min-height: 200px;
  border-radius: 12px;
  padding: 20px;

  .add-btns {
    margin-bottom: 20px;
  }
}
</style>
