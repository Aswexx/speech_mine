<template>
  <div class="mx-auto h-[100dvh] flex flex-col">
    <NavBar/>
    <div class="flex-1 flex">
      <SideMenu/>
      <slot/>
    </div>
  </div>
</template>