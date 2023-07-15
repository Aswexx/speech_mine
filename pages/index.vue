<script lang="ts" setup>
useSeoMeta({
  title: 'SpeechMine'
})

definePageMeta({
  middleware: ['auth']
})
const user = useSupabaseUser()
const userInfo = useState<{
  id: string,
  name: string,
  email: string,
  createdAt: string
}>('userInfo')
const { getBooksByUserId, getSpeechTags } = useBooks()

onMounted(async () => {
  // useBooks().value = await useFetch('/api/books')
  await getBooksByUserId(user.value?.id)
  await getSpeechTags()
})
</script>

<template>
  <NuxtLayout>
    <div class="hero h-full">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello {{ userInfo.name }}</h1>
          <p class="py-6">開始建構自己專屬的話術體系吧</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>