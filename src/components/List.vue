<template>
  <div class="flow-container">
    <div class="flow-buttons">
      <el-input v-model="flowName"></el-input>
      <el-button type="primary" size="small">新建流程</el-button>
    </div>
    <div class="flow-list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >Detail</el-button
            >
            <el-button type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { queryFlowList } from '../service/flow'

export default {
  setup() {
    const tableData = ref([
      // {
      //   date: '2016-05-03',
      //   name: 'Tom',
      //   state: 'California',
      //   city: 'Los Angeles',
      //   address: 'No. 189, Grove St, Los Angeles',
      //   zip: 'CA 90036',
      //   tag: 'Home',
      // },
    ])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const flowName = ref('')
    return {
      tableData,
      currentPage,
      pageSize,
      flowName
    }
  },
  mounted () {
    this.$_queryFlowList()
  },
  methods: {
    $_queryFlowList() {
      queryFlowList({
        current: this.currentPage,
        size: this.pageSize
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.flow-container {
  width: 1000px;
  margin: 0 auto;
}
.flow-buttons {
  margin: 10px 0;
}
.flow-list {
  border: 1px solid #9a9a9c;
}
</style>