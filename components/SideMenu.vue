<script lang="ts" setup>
const supabase = useSupabaseClient()
async function logout() {
  await supabase.auth.signOut()
  alert('logged out')
  navigateTo('/login')
}
</script>

<template>
  <ul class="menu menu-md bg-base-200 w-40 rounded-box">
    <li @click="navigateTo('/speechModifier')"><a>答覆修飾 AI</a></li>
    <li><a>md item 2</a></li>
    <li><a @click="logout">登出</a></li>
  </ul>
</template>