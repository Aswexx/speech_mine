<script lang="ts" setup>
const cause = ref('')
const modified = ref('')
const loading = ref(false)

async function submitReason() {
  loading.value = true
  const { data, error } = await useFetch('/api/prompt', {
    method: 'post',
    body: {
      cause: cause.value
    }
  })

  if (data.value) {
    modified.value = data.value.modifiedResult
  }

  loading.value = false
}

async function copy() {
  await navigator.clipboard.writeText(modified.value)
  alert('copied')
}
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 p-4">

      <div class="form-control">
        <label class="label">
          <span class="label-text">編輯答覆</span>
          <span class="label-text-alt">
            <Icon
              @click="copy"
              class="cursor-pointer"
              name="material-symbols:content-copy-outline-sharp"
              color="red"
              size="32"
            />
            <Icon
              @click="copy"
              class="cursor-pointer"
              name="game-icons:archive-register"
              color="red"
              size="32"
            />
          </span>
        </label>
        <textarea class="textarea textarea-bordered h-24 textarea-primary" placeholder="..."
          v-model="modified"
        ></textarea>
        <span v-if="loading" class="loading loading-bars loading-sm text-primary"></span>
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
          <button @click="submitReason" class="btn btn-secondary">送出</button>
        </div>
      </div>

    </div>

  </NuxtLayout>
</template>