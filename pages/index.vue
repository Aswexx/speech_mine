<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})
const user = useSupabaseUser()
const { getBooksByUserId, getSpeechTags } = useBooks()

onMounted(async () => {
  // useBooks().value = await useFetch('/api/books')
  await getBooksByUserId(user.value?.id)
  await getSpeechTags()
})
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