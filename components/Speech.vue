<script lang="ts" setup>
const { content, speechId } = defineProps<{
  content: string
  speechId: string
  removable: boolean
}>()

const emits = defineEmits(['addToBook'])

const speeches = useState<Speech[]>('currentSpeeches')

async function removeSpeech() {
  const { data, error } = await useFetch(`/api/contains/${speechId}`, {
    method: 'DELETE',
    body: {
      bookId: useRoute().params.bookId as string
    }
  })
  if (!error.value) {
    useToast('alert-success', '已刪除')
    // 移除前端的資料
    const indexToRemove = speeches.value?.findIndex(sp => sp.speech.id === speechId)
    speeches.value?.splice(indexToRemove, 1)
  }
}
</script>

<template>
  <div class="flex justify-between items-center">
    <p class="flex-1">
      {{ content }}
    </p>
    <div class="space-x-2 self-start mb-6 px-1">
      <Icon
        @click="useCopySpeech(content)"
        class="cursor-pointer"
        name="material-symbols:content-copy-outline-sharp"
        color="#3ABFF8"
        size="20"
      />
      <Icon
        v-if="removable"
        @click="removeSpeech()"
        class="cursor-pointer"
        name="mdi:delete-empty-outline"
        color="#3ABFF8"
        size="20"
      />
      <Icon
        v-else
        @click="emits('addToBook', speechId)"
        onclick="my_modal_3.showModal()"
        class="cursor-pointer"
        name="game-icons:archive-register"
        color="#3ABFF8"
        size="20"
      />
    </div>
  </div>
</template>