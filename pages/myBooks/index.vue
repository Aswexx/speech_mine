<script lang="ts" setup>

const bookToAdd = reactive({
  title: '',
  description: '',
  color: ''
})

const titleInput = ref<{ userInput: string }>()
const descriptionInput = ref<{ userInput: string }>()

async function createNewBook() {
  await useFetch('/api/books', {
    method: 'post',
    body: {
      userId: useSupabaseUser().value?.id,
      title: bookToAdd.title,
      description: bookToAdd.description,
      color: bookToAdd.color
    }
  })

  bookToAdd.color = ''
  titleInput.value!.userInput = ''
  descriptionInput.value!.userInput = ''
}

const books = useState<Book[]>('books')

</script>

<template>
  <NuxtLayout>
    <div class="border border-green-600 p-4 flex-1">
      <!-- book create modal -->
      <div>
        <button class="btn" onclick="my_modal_3.showModal()">新增話術本</button>
        <dialog id="my_modal_3" class="modal">
          <form method="dialog" class="modal-box flex flex-col">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <TextInput
              ref="titleInput"
              :label="'話術本名稱'"
              :placeholder="'設定話術本名稱'"
              @normal-input="(input)=> { bookToAdd.title = input }"
            />
            <TextInput
              ref="descriptionInput"
              :label="'說明'"
              :placeholder="'設定話術本說明'"
              @normal-input="(input)=> { bookToAdd.description = input }"
            />
            <div class="form-control w-full max-w-xs">
              <label class="label label-text" for="">設定話術本顏色</label>
              <input class="" ref="colorPicker" type="color" v-model="bookToAdd.color">
            </div>
            <div class="space-x-4 self-end">
              <button class="btn">取消</button>
              <button class="btn btn-accent" @click.prevent="createNewBook">確定</button>
            </div>
          </form>
        </dialog>
      </div>
      <!-- book list -->
      <div class="space-y-4 mt-4 max-h-[70dvh] overflow-auto">
        <Book
          v-for="book in books" :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
</style>