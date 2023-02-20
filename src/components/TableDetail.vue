<!--  -->
<template>
  <div>
    <el-drawer v-model="props.drawer" :direction="direction" :before-close="cancelClick">
      <template #header>
        <h4 v-if="title">{{ title }}</h4>
      </template>
      <template #default>
        <div v-loading="details.login">
          <el-descriptions title="操作人信息" direction="vertical" :column="4" border>
            <el-descriptions-item label="姓名">{{ details.data.username }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ details.data.telephone }}</el-descriptions-item>
            <el-descriptions-item label="地址" :span="2">{{ details.data.place }}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">{{ details.data.remarks }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="详细地址">{{ details.data.address }}
            </el-descriptions-item>
          </el-descriptions>

          <el-descriptions title="商品信息" :column="4" direction="vertical" border>
            <el-descriptions-item label="商品名">{{ details.data.pname }}</el-descriptions-item>
            <el-descriptions-item label="图片">
              <el-image style="width: 50px; height: 50px" :src="details.data.purl" fit="fill" />
            </el-descriptions-item>
            <el-descriptions-item label="描述" :span="2">{{ details.data.describe }}</el-descriptions-item>
            <el-descriptions-item label="链接">
              <a :href="details.data.link">{{ details.data.link }}</a>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </template>
      <template #footer>
        <div v-if="showFoot" style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang='ts' setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, toRefs, onBeforeMount, onMounted, ref, computed, watchEffect } from 'vue'
import { get } from '../api/index'

interface Detail {
  address: string;
  describe: string;
  link: string;
  place: string;
  pname: string;
  purl: string;
  remarks: string;
  telephone: string;
  username: string;
}
const props = defineProps<{
  id: string,
  drawer: boolean,
  direction: "ltr" | "rtl" | "ttb" | "btt",
  title?: string,
  showFoot: boolean,
  onChange: Function
}>()
const details = reactive({
  login: false,
  data: {} as Detail
})

watchEffect(() => {
  if (props.drawer == true) {
    getDetail()
  }
})

function getDetail() {
  details.login = true
  get('/api/shopDetail', { id: props.id }).then((res: any) => {
    details.login = false
    const { code, data, msg } = res.data
    if (code == 200) {
      details.data = data
    } else {
      ElMessage.error(msg)
    }
  })
}

function cancelClick() {
  props.onChange(false)
}
function confirmClick() {
  ElMessageBox.confirm(`确认关闭?`)
    .then(() => {
      props.onChange(false)
    })
    .catch(() => {
      // catch error
    })
}

</script>
<style lang='scss' scoped></style>