<script lang="ts" setup>
const  interactPrompts = useState<{
  type: string,
  content: string
}[]>('interactPrompts', () => {
  return []
})

watch(interactPrompts.value, (newVal) => {
  if (newVal.length) {
    setTimeout(() => {
      interactPrompts.value.shift()
    }, 2000)
  }
})


</script>

<template>
  <div class="toast toast-top z-50">
    <div v-for="alert in interactPrompts" :key="alert.content" class="alert text-white" :class="alert.type">
      <Icon 
        v-if="alert.type === 'alert-success'"
        name="ic:twotone-check-circle-outline" size="24" color="#108910"
      />

      <Icon
        v-else-if="alert.type === 'alert-error'"
        name="radix-icons:cross-circled" size="24" color="#a60717"
      />

      <Icon
        v-else-if="alert.type === 'alert-info'"
        name="bi:exclamation-circle" size="24" color="#1136ee"
      />

      <span>{{ alert.content }}</span>
    </div>
  </div>
</template>