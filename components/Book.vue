<script lang="ts" setup>

const { book } = defineProps<{ book: Book }>()

const title = ref(book.name)
const description = ref(book.description)
const bookColor = ref(book.color)

const isEditing = ref(false)
const colorPicker = ref<HTMLInputElement>()
const editingColorPicker = ref<HTMLInputElement>()

const editing = reactive({
  title: title.value,
  description: description.value,
  bookColor: bookColor.value,
})

function cancelUpdate() {
  editing.title = title.value
  editing.description = description.value
  editing.bookColor = bookColor.value

  isEditing.value = false
}

async function updateInfo(bookId: string) {
  title.value = editing.title
  description.value = editing.description
  bookColor.value = editing.bookColor

  // TODO: put 請求更新 DB
  await useFetch(`/api/books/${bookId}`, {
    method: 'put',
    body: {
      name: editing.title,
      description: editing.description,
      color: editing.bookColor
    }
  })
  isEditing.value = false
}

function changeColor() {
  if (!isEditing.value) {
    colorPicker.value?.click()
  } else {
    editingColorPicker.value?.click()
  }
}
</script>

<template>
    <div class="card card-compact card-bordered card-side bg-base-100 shadow-xl"
      :class="{ 'border-animition': isEditing }"
    >
    
      <span class="b-animation-span"></span>
      <span class="b-animation-span"></span>
      <span class="b-animation-span"></span>
      <span class="b-animation-span"></span>
    
      <figure>
        <Icon v-if="!isEditing"
          class="border-none"
          name="ph:book-duotone"
          :color="bookColor"
          size="70"
        />
        <Icon v-else
          @click="changeColor"
          class="cursor-pointer border-none"
          name="ph:book-duotone"
          :color="editing.bookColor"
          size="70"
        />
      </figure>
      <div class="card-body">
        <template v-if="isEditing">
          <input type="text" 
            class="outline-none border-b-2 border-b-gray-700 p-0.5 bg-[#0F1729]
              text-xl font-bold"
            v-model="editing.title"
          >
          <input type="text" 
            class="outline-none border-b-2 border-b-gray-700 p-0.5 bg-[#0F1729]"
            v-model="editing.description"
          >
        </template>
        <template v-else>
          <h2 class="card-title">{{ title }}</h2>
          <p>{{ description }}</p>
        </template>
      </div>
      <div class="self-center flex items-center space-x-2 px-2">
        <template v-if="isEditing">
          <span class="btn" @click="cancelUpdate">取消</span>
          <span class="btn btn-secondary" @click="updateInfo(book.id)">保存變更</span>
        </template>
        <template v-else>
          <span class="cursor-pointer" @click="isEditing = true">
            <Icon
              name="material-symbols:box-edit-outline-rounded"
              size="24"
            />
          </span>
          <button class="btn btn-primary" @click="navigateTo(`/mybooks/${book.id}`)">Watch</button>
        </template>
      </div>
  
      <input v-if="!isEditing" class="w-0 h-0" ref="colorPicker" type="color" v-model="bookColor">
      <input v-else class="w-0 h-0" ref="editingColorPicker" type="color" v-model="editing.bookColor">
    </div>
</template>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
.border-animition {
  overflow: hidden;
}
.border-animition .b-animation-span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, #17f3fd);
  animation: animate_one 2s linear infinite;
}

@keyframes animate_one 
{
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.border-animition .b-animation-span:nth-child(2) {
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #17f3fd);
  animation: animate_two 2s linear infinite;
  animation-delay: 1s;
}

@keyframes animate_two
{
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.border-animition .b-animation-span:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to left, transparent, #17f3fd);
  animation: animate_three 2s linear infinite;
}

@keyframes animate_three
{
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.border-animition .b-animation-span:nth-child(4) {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to top, transparent, #17f3fd);
  animation: animate_four 2s linear infinite;
  animation-delay: 1s;
}

@keyframes animate_four
{
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>