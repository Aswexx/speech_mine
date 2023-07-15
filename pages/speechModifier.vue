<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const { handleTagSelect, createNewSpeech, modalRenderKey, speechTags } = useSpeechCreateFlow()
const books = useState<Book[]>('books')

const selectedBookId = ref('')

const cause = ref('')
const modified = ref('')
const isLoading = useState('isLoading')

async function submitReason() {
  if (!cause.value || cause.value.length > 30) {
    return useToast('alert-error', '原因不能為空或超過30個字')
  }

  const { data, error } = await useFetch('/api/prompt', {
    method: 'post',
    body: {
      cause: cause.value
    }
  })

  if (data.value) {
    modified.value = data.value.modifiedResult
  }
}

</script>

<template>
  <NuxtLayout>
    <div class="flex-1 p-4">
      <!-- speech create modal -->
      <div :key="modalRenderKey">
        <dialog id="my_modal_3" class="modal">
          <form method="dialog" class="modal-box flex flex-col">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h1 class="label-text">選擇<b>一至三個</b>話術標籤</h1>
            <div class="w-full flex flex-wrap space-x-2">
              <Tag
                v-for="tag in speechTags" :key="tag.id"
                :tagId="tag.id"
                :name="tag.name"
                @selected="handleTagSelect"
              />
            </div>
            <div class="my-4 space-y-2">
              <h1 class="label-text">選擇要加入的目的話術本</h1>
              <select class="select select-primary w-full max-w-xs" v-model="selectedBookId">
                <option disabled selected>選擇話術本</option>
                <option v-for="book in books" :key="book.id" :value="book.id">{{ book.name }}</option>
              </select>
            </div>
            <div class="space-x-4 self-end">
              <button class="btn">取消</button>
              <button class="btn btn-accent" 
                @click.prevent="createNewSpeech({bookId: selectedBookId, content:modified})">
                確定
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <!-- --- -->


      <div class="form-control">
        <label class="label">
          <span class="label-text">編輯答覆</span>
          <span class="label-text-alt">
            <Icon
              @click="useCopySpeech(modified)"
              class="cursor-pointer"
              name="material-symbols:content-copy-outline-sharp"
              color="#3ABFF8"
              size="32"
            />
            <Icon
              onclick="my_modal_3.showModal()"
              class="cursor-pointer"
              name="game-icons:archive-register"
              color="#3ABFF8"
              size="32"
            />
          </span>
        </label>
        <textarea class="textarea textarea-bordered h-32 textarea-primary" placeholder="..."
          v-model="modified"
        ></textarea>
        <span v-if="isLoading" class="loading loading-bars loading-sm text-primary"></span>
      </div>


      <div class="mx-auto mt-20 form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">問題原因</span>
        </label>
        <div class="flex space-x-4">
          <input type="text" placeholder="精簡描述問題原因，最多30個字" 
            class="input input-bordered input-primary w-full"
            v-model="cause"
          />
          <button @click="useReqDebounce(submitReason)" class="btn btn-secondary">送出</button>
        </div>
      </div>

    </div>

  </NuxtLayout>
</template>