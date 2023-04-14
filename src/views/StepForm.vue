<!-- 分步骤表单 -->
<template>
  <div class="step-home-page">
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="填写转账信息" :icon="Edit" />
      <el-step title="确认转账信息" :icon="Upload" />
      <el-step title="完成" :icon="Picture" />
    </el-steps>

    <!-- 内容区域 -->
    <!-- todo 拆分组件 -->
    <div class="contain">
      <el-form
        :model="form"
        label-width="100px"
        ref="formRef"
        :rules="rules"
        label-position="top"
      >
        <div v-show="active === 0">
          <el-form-item label="付款账户" prop="account">
            <el-select v-model="form.account">
              <el-option label="hearling@qq.com" value="hearling@qq.com" />
            </el-select>
          </el-form-item>
          <el-form-item label="收款账户" prop="type">
            <el-input v-model="form.acceptAccount">
              <template #prepend>
                <el-select v-model="form.type">
                  <el-option label="支付宝" :value="1" />
                  <el-option label="微信支付" :value="2" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="收款人姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="转账金额" prop="price">
            <el-input-number
              v-model="form.price"
              controls-position="right"
              :min="1"
              :max="1000"
            />
          </el-form-item>
        </div>
        <div v-show="active === 1">
          <el-alert
            title="确认转账后，资金将直接打入对方账户，无法退回。"
            type="warning"
            show-icon
          />
          <el-descriptions border :column="1">
            <el-descriptions-item>
              <template #label> 付款账户 </template>
              {{ form.account }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 收款账户 </template>
              {{ form.acceptAccount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 收款人姓名 </template>
              {{ form.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 转账金额 </template>
              {{ form.price }}元
            </el-descriptions-item>
          </el-descriptions>
          <hr />
          <el-form-item label="支付密码" prop="name">
            <el-input
              v-model="form.pass"
              type="passworld"
              placeholder="请输入"
            />
          </el-form-item>
        </div>
        <div v-show="active === 2">
          <el-result
            icon="success"
            title="操作成功"
            sub-title="预计两小时内到账"
          />

          <el-descriptions title="账单信息" :column="1" border>
            <el-descriptions-item label="付款账户"
              >ant-design@alipay.com</el-descriptions-item
            >
            <el-descriptions-item label="收款账户"
              >test@example.com</el-descriptions-item
            >
            <el-descriptions-item label="收款人姓名">Alex</el-descriptions-item>
            <el-descriptions-item label="转账金额"
              >500.00元
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-form>
    </div>

    <div class="foot">
      <el-button v-show="active > 0" style="margin-top: 12px" @click="preview"
        >上一步</el-button
      >
      <el-button
        v-show="active !== 2"
        style="margin-top: 12px"
        @click="next"
        type="primary"
        >下一步</el-button
      >
      <el-button
        v-show="active === 2"
        style="margin-top: 12px"
        @click="submit"
        type="primary"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Picture, Upload } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';

const active = ref(0);

const form = reactive({
  account: 'hearling@qq.com',
  type: 1,
  acceptAccount: '',
  name: '',
  price: 1,
  pass: '',
});
// todo 类型校验
const rules = reactive({
  account: [{ required: true, message: '请选择账号' }],
  name: [{ required: true, message: '请输入收款人姓名' }],
  price: [{ required: true, message: '请输入转账金额' }],
});

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
const preview = () => {
  if (active.value > 0) active.value--;
};
const submit = () => {
  // 提交表单
};
</script>
<style lang="scss" scoped>
.el-alert--warning {
  margin: 20px 0px;
}

hr {
  margin: 32px 0px;
}

.step-home-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  width: 100%;

  .contain {
    width: 600px;
    flex: 1 0 auto;
    padding-top: 20px;
    margin: auto;

    .result {
      background-color: #fafafa;

      .el-descriptions .el-descriptions__body {
        background-color: #fafafa !important;
      }
    }
  }

  .foot {
    height: 60px;
    background-color: #f5f7fa;
    display: flex;
    justify-content: flex-end;
    padding-right: 12px;
  }
}
</style>
