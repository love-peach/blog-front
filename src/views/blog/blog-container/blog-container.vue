<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-42 z-col-xl-45">
        <router-view />
      </div>
      <div class="z-col-sm-18 z-col-xl-15">
        <router-view name="sidePart" />
      </div>
    </div>
  </div>
</template>
