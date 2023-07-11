<script lang="ts" setup>
const supabase = useSupabaseClient()
async function logout() {
  await supabase.auth.signOut()
  alert('logged out')
  navigateTo('/account/login')
}
</script>

<template>
  <ul class="menu menu-md bg-base-200 w-40 rounded-box">
    <li @click="navigateTo('/speechModifier')"><a>答覆修飾 AI</a></li>
    <li @click="navigateTo('/myBooks')"><a>我的話術本</a></li>
    <li><a>話術池搜尋</a></li>
    <li><a @click="logout">登出</a></li>
  </ul>
</template>