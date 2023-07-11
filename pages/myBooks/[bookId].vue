<script lang="ts" setup>
const { bookId } = useRoute().params
const speechTags = useState<{ id: string, name: string }[]>('speechTags')
const speeches = useState<Speech[]>('currentSpeeches')
const { getSpeechesByBook } = useBooks()
const content = ref('')

const selectedTags = new Set()

function handleTagSelect(tag: { tagId: string, selected: boolean}) {
  if (tag.selected) {
    selectedTags.add(tag.tagId)
  } else {
    selectedTags.delete(tag.tagId)
  }
}

const modalRenderKey = ref(0)
async function createNewSpeech() {
  const tags = Array.from(selectedTags)

  const { data: newSpeech } = await useFetch('/api/speeches', {
    method: 'POST',
    body: {
      bookId,
      tags,
      content: content.value
    }
  })

  speeches.value.unshift({
    speech: newSpeech.value
  } as Speech)

  // reset input
  modalRenderKey.value += 1
  selectedTags.clear()
}

onMounted(async() => {
  await getSpeechesByBook(bookId as string)
})

</script>

<template>
  <NuxtLayout>
    <div class="border border-green-600 p-4 flex-1">
      <h1>book詳情</h1>

      <!-- speech create modal -->
      <div :key="modalRenderKey">
        <button class="btn" onclick="my_modal_3.showModal()">新增話術</button>
        <dialog id="my_modal_3" class="modal">
          <form method="dialog" class="modal-box flex flex-col">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h1 class="label-text">選擇<b>一至三個</b>話術標籤</h1>
            <div class="w-full flex flex-wrap space-x-2">
              <Tag
                ref="tagInModal"
                v-for="tag in speechTags" :key="tag.id"
                :tagId="tag.id"
                :name="tag.name"
                @selected="handleTagSelect"
              />
            </div>
            <TextInput
              ref="inputInModal"
              :label="'話術內容'"
              :placeholder="'輸入話術內容'"
              @normal-input="(input)=> { content = input }"
            />
            <div class="space-x-4 self-end">
              <button class="btn">取消</button>
              <button class="btn btn-accent" @click.prevent="createNewSpeech">確定</button>
            </div>
          </form>
        </dialog>
      </div>
      <!-- --- -->

      <!-- speeches table -->
      <div class="overflow-x-auto h-[60dvh]">
        <table class="table table-zebra table-pin-rows">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>屬性標籤</th>
              <th>內容</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="speech in speeches" :key="speech.speech.id">
              <th>1</th>
              <td>
                <Tag
                  v-for="marking in speech.speech.marking" :key="marking.tag.id"
                  :name="marking.tag.name"
                  :color="marking.tag.color"
                />
              </td>
              <td>{{ speech.speech.content }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->

    </div>
  </NuxtLayout>
</template>
