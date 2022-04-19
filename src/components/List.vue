<template>
  <div class="flow-container">
    <div class="flow-buttons">
      <el-input v-model="flowName" class="flow-search" placeholder="输入流程流程"></el-input>
      <el-button type="primary" class="search-flow" @click="$_queryFlowList">搜索流程</el-button>
      <el-button type="primary" class="create-flow" @click="$_openCreateFlow">新建流程</el-button>
    </div>
    <div class="flow-list">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="flowModuleId" label="flowModuleId" />
        <el-table-column prop="flowName" label="流程名称" />
        <el-table-column prop="flowKey" label="flowKey" />
        <el-table-column label="流程状态">
          <template #default="scope">
            {{ getStatus(scope.row.status)  }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template #default="scope">
            {{ moment(scope.row.modifyTime).format("YYYY/MM/DD HH:mm:ss")  }}
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="修改人" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="text" size="small" @click="$_goDetail(scope.row.flowModuleId)">查看流程</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        v-model:current-page="currentPage"
        @current-change="$_queryFlowList"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="新建流程"
      width="30%"
    >
        <el-form
          :label-position="right"
          label-width="100px"
          :model="formInfo"
          style="max-width: 460px"
        >
          <el-form-item label="流程名称" prop="flowName">
            <el-input v-model="formInfo.flowName" />
          </el-form-item>
          <el-form-item label="flowKey" prop="flowKey">
            <el-input v-model="formInfo.flowKey" />
          </el-form-item>
          <el-form-item label="创建人" prop="operator">
            <el-input v-model="formInfo.operator" />
          </el-form-item>
          <!-- <el-form-item label="租户标识" prop="tenant">
            <el-input v-model="formInfo.tenant" />
          </el-form-item> -->
        </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="$_createFlow">新建</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'
import { queryFlowList, createFlow } from '../service/flow'
const CALLER = 'TEST_CALLER'

export default {
  setup() {
    const tableData = ref([
    ])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const flowName = ref('')
    const total = ref(0)
    const loading = ref(false)
    const dialogVisible = ref(false)
    const formInfo = ref({
      flowName: '',
      operator: '',
      tenant: '',
      flowKey: ''
    })
    const statusMap = {
      0: '默认',
      1: '草稿',
      2: '编辑中',
      3: '已下线',
      4: '已发布'
    }
    const getStatus = (status) => {
      return statusMap[status]
    }
    return {
      tableData,
      currentPage,
      pageSize,
      flowName,
      moment,
      loading,
      getStatus,
      dialogVisible,
      total,
      formInfo
    }
  },
  mounted () {
    this.$_queryFlowList()
  },
  methods: {
    $_queryFlowList() {
      this.loading = true
      queryFlowList({
        current: this.currentPage,
        size: this.pageSize,
        flowName: this.flowName
      }).then(({ data }) => {
        const { flowModuleList, total } = data;
        this.tableData = flowModuleList
        this.loading = false
        this.total = total
      }).catch(e => {
        this.loading = false
      })
    },
    $_goDetail(item) {
      this.$router.push({
        path: `/flow/${item}`
      })
    },
    $_openCreateFlow () {
      this.dialogVisible = true
    },
    $_createFlow() {
      createFlow({
        caller: CALLER,
        flowName: this.formInfo.flowName,
        flowKey: this.formInfo.flowKey,
        operator: this.formInfo.operator,
        tenant: 'TEST_TENANT',
      }).then(({ data, errCode }) => {
        if (errCode === 1000) {
          const { flowModuleId } = data;
          this.$_goDetail (flowModuleId)
        } else {
          throw new Error(data)
        }
      }).catch(e => {
        ElMessage({
          showClose: true,
          message: '新建流程失败',
          type: 'error',
        })
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
  display: flex;
}
.flow-search {
  width: 300px;
}
.flow-list {
  border: 1px solid #9a9a9c;
}
.create-flow {
  margin-left: 525px;
}

</style>