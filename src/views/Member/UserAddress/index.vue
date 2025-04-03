<!-- <template>
  <div class="fs-member-useraddress-container">
    <div class="add-btns">
      <el-button type="primary">添加收货地址</el-button>
    </div>

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
</template> -->
<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="4">
    <v-card-item>
      <v-card-action>
        <v-btn color="primary">添加收货地址</v-btn>
      </v-card-action>
    </v-card-item>
    <v-card-item>
      <v-divider></v-divider>
    </v-card-item>
    <v-card-item>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              收货人
            </th>
            <th class="text-left">
              收获地址
            </th>
            <th class="text-left">
              联系电话
            </th>
            <th class="text-left">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.consignee }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td class="member-add-actions">
              <v-btn size="small" color="success">编辑</v-btn>
              <v-btn size="small" color="error">删除</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
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
.member-add-actions {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>
