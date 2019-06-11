<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-17 z-col-xl-18">
        <router-view />
      </div>
      <div class="z-col-sm-7 z-col-xl-6">
        <router-view name="sidePart" />
      </div>
    </div>
  </div>
</template>
