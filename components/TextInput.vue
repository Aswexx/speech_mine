<script lang="ts" setup>

const userInput = ref('')

const emits = defineEmits(['emailInput', 'passwordInput'])
const { label, placeholder } = defineProps<{
  label: string
  placeholder?: string
  type?: string
}>()

function passInputValue() {
  switch (label) {
    case 'Email':
      emits('emailInput', userInput.value)
      break
    case '密碼':
      emits('passwordInput', userInput.value)
      break
  }
}
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
      <span class="label-text">
        <slot/>
      </span>
    </label>
    <input
      @blur="passInputValue"
      v-model="userInput"
      :type="type ? type : 'text'" 
      :placeholder="placeholder" 
      class="input input-bordered input-primary w-full max-w-xs" />
  </div>
</template>