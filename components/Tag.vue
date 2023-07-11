<script lang="ts" setup>
const { name, tagId, color } = defineProps<{ name: string, tagId?: string, color?: string }>()
// 不傳 tagId 表示只用於 table 處的標籤屬性顯示欄
const emits = defineEmits(['selected'])
const selected = ref(false)

function passValue() {
  selected.value = !selected.value

  if (selected.value) {
    emits('selected', { tagId, selected: true })
  } else {
    emits('selected', { tagId, selected: false })
  }
}

</script>

<template>
  <template v-if="tagId">
    <div class="cursor-pointer" @click="passValue">
      <div class="badge" :class="{ 'badge-secondary': selected }">{{ name }}</div>
    </div>
  </template>

  <template v-else>
    <div class="badge" :style="`background-color: ${color};`" >{{ name }}</div>
  </template>
</template>