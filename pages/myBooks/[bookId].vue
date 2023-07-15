<script lang="ts" setup>
const  bookId  = useRoute().params.bookId as string
const speeches = useState<Speech[]>('currentSpeeches')
const { getSpeechesByBook } = useBooks()
const { handleTagSelect, createNewSpeech, modalRenderKey, speechTags } = useSpeechCreateFlow()
const content = ref('')
const selectedFilterTags = ref(new Set())
const showingSpeeches = computed(() => {
  if (!selectedFilterTags.value.size) return speeches.value
  return speeches.value.filter(sp => {
    for (const marking of sp.speech.marking) {
      if (selectedFilterTags.value.has(marking.tag.id)) {
        return true
      }
    }
    return false
  })
})

function handleFilterTagSelect(tagId?: string) {
  if (!tagId) return selectedFilterTags.value.clear()
  selectedFilterTags.value.has(tagId) ?
    selectedFilterTags.value.delete(tagId) :
    selectedFilterTags.value.add(tagId)
}

onMounted(async() => {
  await getSpeechesByBook(bookId as string)
})

</script>

<template>
  <NuxtLayout>
    <div class="border border-green-600 p-4 flex-1">
      <!-- filter tags -->
      <div class="ml-auto w-1/2 grid grid-cols-3 gap-0.5">
        <Tag
          class="cursor-pointer badge-lg"
          :name="'全部'"
          :style="{'background-color': selectedFilterTags.size ? '' : '#18B4F7'}"
          @click="handleFilterTagSelect()"
        />
        <Tag
          class="cursor-pointer badge-lg"
          :style="{'background-color': selectedFilterTags.has(tag.id) ? tag.color : ''}"
          v-for="(tag,n) in speechTags" :key="n"
          :name="tag.name"
          @click="handleFilterTagSelect(tag.id)"
        />
      </div>

      <!-- speech create modal -->
      <div :key="modalRenderKey">
        <button class="btn" onclick="my_modal_3.showModal()">新增話術</button>
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
            <TextInput
              ref="inputInModal"
              :label="'話術內容'"
              :placeholder="'輸入話術內容'"
              @normal-input="(input)=> { content = input }"
            />
            <div class="space-x-4 self-end">
              <button class="btn">取消</button>
              <button class="btn btn-accent" @click.prevent="createNewSpeech({ bookId , content })">確定</button>
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
            <tr v-for="speech,n in showingSpeeches" :key="speech.speech.id">
              <th>{{ n+1 }}</th>
              <td class="w-1/5">
                <Tag
                  v-for="marking in speech.speech.marking" :key="marking.tag.id"
                  :name="marking.tag.name"
                  :color="marking.tag.color"
                />
              </td>
              <td>
                <!-- <div>
                  {{ speech.speech.content }}
                </div> -->
                <Speech
                  :content="speech.speech.content"
                  :speechId="speech.speech.id"
                  :removable="true"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->

    </div>
  </NuxtLayout>
</template>
