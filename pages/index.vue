<script lang="ts" setup>
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