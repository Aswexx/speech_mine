<template>
  <div class="mx-auto h-[100dvh] flex flex-col border border-red-700">
    <NavBar/>
    <div class="flex-1 flex border border-blue-700">
      <SideMenu/>
      <slot/>
    </div>
  </div>
</template>