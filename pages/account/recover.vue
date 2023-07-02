<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

function handleEmailInput(inputValue: string) {
  email.value = inputValue
}

async function requestReset() {
  // TODO: 檢查 Email
  alert(email.value)
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${useRuntimeConfig().public.HOST_URL}/account/update`
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
      :placeholder="'輸入註冊 Email'"
    />

    <button class="btn btn-secondary" @click="requestReset">
      送出
    </button>
  </div>
</template>