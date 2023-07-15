<script lang="ts" setup>

const supabase = useSupabaseClient()
const isLogin = ref(true)
const email = ref('')
const password = ref('')

const passwordInputType = ref('password')

function formSubmit() {
  // TODO: 先做資料驗證
  if (isLogin.value) return login()
  return signUp()
}

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (!error) {
    navigateTo('/')
  }
}

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (!error) {
    // 同步 auth user 與 public user 資料
    const { data: user, error } = await useFetch('/api/users', {
      method: 'post',
      body: {
        userId: data.user.id,
        email: data.user.email
      }
    })

    useState('userInfo', () => user.value)
    navigateTo('/')
  }
}

function handleEmailInput(inputValue: string) {
  email.value = inputValue
}

function handlePasswordInput(inputValue: string) {
  password.value = inputValue
}


function changeType() {
  if (passwordInputType.value === 'text') {
    passwordInputType.value = 'password'
  } else {
    passwordInputType.value = 'text'
  }
}
</script>

<template>
  <div class="h-[100dvh] flex flex-col justify-center items-center space-y-4">
    <h1 class="text-3xl font-bold">
      {{ isLogin ? '登入帳號' : '帳號註冊' }}
    </h1>
    <TextInput
      @email-input="handleEmailInput"
      :label="'Email'"
      :placeholder="'輸入 Email'"
    />

    <TextInput
      @password-input="handlePasswordInput"
      :label="'密碼'"
      :placeholder="'輸入密碼'"
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

        <template v-if="isLogin" #bottomRight>
          <span class="cursor-pointer underline" @click="navigateTo('/account/recover')">忘記密碼</span>
        </template>
    </TextInput>

    <button class="btn btn-secondary" @click="formSubmit">
      {{ isLogin? '登入' : '註冊' }}
    </button>

    <p class="italic underline cursor-pointer"
      @click="isLogin = !isLogin"
    >
      {{ isLogin ? '還沒有帳號? 點此建立' : '已有帳號? 點此登入'}}
    </p>
  </div>
</template>