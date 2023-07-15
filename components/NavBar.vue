<script lang="ts" setup>
const userName = useState<UserInfo>('userInfo').value.name
</script>

<template>
  <div class="navbar bg-base-100 shadow-2xl">
    <div class="flex-1">
      <div class="px-4 cursor-pointer" @click="navigateTo('/')">
        <img class="w-[50px] scale-125" src="@/assets/images/logo.svg">
      </div>
    </div>
    <div class="flex-none gap-2">
      <div>
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://source.unsplash.com/rDEOVtE7vOs" />
          </div>
        </label>
      </div>
      <span>{{ userName }}</span>
    </div>
  </div>
</template>