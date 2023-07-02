<script lang="ts" setup>
// definePageMeta({
//   middleware: ['auth']
// })
const user = useSupabaseUser()
</script>

<template>
  <NuxtLayout>
    <div>
      <h1>首頁</h1>
      <div>
        {{ user }}
      </div>
    </div>
  </NuxtLayout>
</template>