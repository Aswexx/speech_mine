<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const checkPassword = ref('')
const passwordInputType = ref('password')

function handlePasswordInput(inputValue: string) {
  password.value = inputValue
}

function handleEmailInput(inputValue: string) {
  email.value = inputValue
}

function handleCheckPassword(inputValue: string) {
  checkPassword.value = inputValue
}

function changeType() {
  if (passwordInputType.value === 'text') {
    passwordInputType.value = 'password'
  } else {
    passwordInputType.value = 'text'
  }
}

async function updatePassword() {
  // TODO: 檢查 email 格式、密碼一致性
  alert(email.value)
  alert(password.value)
  alert(checkPassword.value)

  if (!(password.value === checkPassword.value)) return
  // TODO: FIX: auth session missing error
  const { error } = await supabase.auth.updateUser({
    email: email.value,
    password: password.value
  })

  if (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="h-[100dvh] flex flex-col justify-center items-center space-y-4">
    <h1 class="text-3xl font-bold">
      重置密碼
    </h1>
    <TextInput
      @email-input="handleEmailInput"
      :label="'Email'"
      :placeholder="'輸入 Email'"
    />

    <TextInput
      @password-input="handlePasswordInput"
      :label="'密碼'"
      :placeholder="'輸入新密碼'"
      :type="passwordInputType"
    >
      <Icon
        v-if="passwordInputType === 'password'"
        @click="changeType"
        class="cursor-pointer"
        name="ic:outline-remove-red-eye"
        color="#11EE66"
        size="18"
      />

      <Icon
        v-else
        @click="changeType"
        class="cursor-pointer"
        name="ant-design:eye-invisible-outlined"
        color="#11EE66"
        size="18"
      />
    </TextInput>

    <TextInput
      @check-password="handleCheckPassword"
      :label="'再次確認密碼'"
      :placeholder="'確認新密碼'"
      :type="passwordInputType"
    >
      <Icon
        v-if="passwordInputType === 'password'"
        @click="changeType"
        class="cursor-pointer"
        name="ic:outline-remove-red-eye"
        color="#11EE66"
        size="18"
      />
      <Icon
        v-else
        @click="changeType"
        class="cursor-pointer"
        name="ant-design:eye-invisible-outlined"
        color="#11EE66"
        size="18"
      />
    </TextInput>

    <button class="btn btn-secondary" @click="updatePassword">
      送出
    </button>
  </div>
</template>