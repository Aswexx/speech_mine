<script setup lang="ts">
const speeches = ref<any[]>([])
const { speechTags } = useSpeechCreateFlow()

const keyword = ref('')

const isLoading = useState('isLoading')

// 
const books = useState<Book[]>('books')
const selectedBookId = ref('')
const speechIdToAdd = ref('')


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

async function querySpeech() {
  if (!selectedFilterTags.value.size && !keyword.value) {
    return useToast('alert-error','至少設定一種標籤分類或是關鍵字查詢')
  }
  speeches.value?.splice(0,speeches.value.length)
  const { data, error } = await useFetch('/api/speeches/query', {
    query: {
      keyword: keyword.value,
      filterTags: Array.from(selectedFilterTags.value)
    }
  })
  speeches.value?.push(...data.value as any)
}


async function addToBook() {
  const { data, error } = await useFetch('/api/contains', {
    method: 'post',
    body: {
      bookId: selectedBookId.value,
      speechId: speechIdToAdd.value
    }
  })

  if (!error.value) {
    useToast('alert-success', '已新增至話術本')
  } else {
    console.log(error.value)
    useToast('alert-error', '無法新增至話術本')
  }
}


</script>

<template>
  <NuxtLayout>
    <div class="p-4 flex-1 flex flex-col">
      <!-- speech create modal -->
      <div>
        <dialog id="my_modal_3" class="modal">
          <form method="dialog" class="modal-box flex flex-col">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div class="my-4 space-y-2">
              <h1 class="label-text">選擇要加入的目的話術本</h1>
              <select class="select select-primary w-full max-w-xs" v-model="selectedBookId">
                <option disabled selected>選擇話術本</option>
                <option v-for="book in books" :key="book.id" :value="book.id">{{ book.name }}</option>
              </select>
            </div>
            <div class="space-x-4 self-end">
              <button class="btn">取消</button>
              <button class="btn btn-accent" @click="addToBook">
                確定
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <!-- --- -->


      <!-- 話術標籤 -->
      <div class="self-center space-y-2">
        <!-- filter tags -->
        <div class="grid grid-cols-3 gap-0.5">
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
        <!-- 搜尋 input -->
        <TextInput
          :label="'關鍵字'"
          :placeholder="'輸入話術內容關鍵字'"
          @normal-input="input=> keyword = input"
        />
        <button class="block mx-auto btn btn-accent" @click="useReqDebounce(querySpeech)">查詢</button>
      </div>


      <!-- 結果顯示 -->
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
            <tr v-show="isLoading">
              <td colspan="3">
                <div class="flex justify-center">
                  <span class="loading loading-spinner text-secondary loading-lg"></span>
                </div>
              </td>
            </tr>
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
                  :removable="false"
                  @add-to-book="speechId => { speechIdToAdd = speechId }"
                />
              </td>
            </tr>

            <tr v-if="!isLoading && !showingSpeeches.length">
              <td colspan="3" class="text-center">
                <span>暫無符合結果</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
    </div>
  </NuxtLayout>
</template>