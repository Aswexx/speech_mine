<script lang="ts" setup>
const { name, tagId, color } = defineProps<{ name: string, tagId?: string, color?: string }>()
const emits = defineEmits(['selected'])
const selected = ref(false)

const selectedTags = useState<Set<any>>('selectedTags')

function passValue() {
  if (selectedTags.value.size >= 3 && !selected.value) {
    alert('至多選擇3種')
    return
  }

  
  selected.value = !selected.value
  if (selected.value) {
    emits('selected', { tagId, selected: true })
  } else {
    emits('selected', { tagId, selected: false })
  }

}

</script>

<template>
  <!-- 有 tagId 用於新增 speech 處的標籤屬性 -->
  <template v-if="tagId">
    <div class="cursor-pointer" @click="passValue">
      <div class="badge" :class="{ 'badge-secondary': selected }">
        {{ name }}
      </div>
    </div>
  </template>

  <template v-else>
    <div class="badge text-gray-200" :style="`background-color: ${color};`" >{{ name }}</div>
  </template>
</template>