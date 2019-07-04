<template>
  <div class="z-video" v-loading="!isReadyPlay">
    <div class="z-video-box">
      <video class="z-video-box-player" id="videoPlayer" :src="src" :poster="poster" type="video/webm" preload="metadata">
        Your browser does not support the video tag.
      </video>
      <div v-show="!isPlaying" class="z-video-box-mask" @click="handleTogglePlay">
        <Icon class="z-video-box-mask-icon" type="play-circle" :size="50" color="fff" />
      </div>
    </div>
    <div class="z-video-control-wrap">
      <div class="z-video-control">
        <div class="z-video-control-play">
          <Icon :type="isPlaying ? 'pause' : 'play'" :size="28" @click="handleTogglePlay" />
        </div>
        <div class="z-video-control-progress">
          <ZProgress :value="currentTime" height="100%" @on-click="handleChangeProgress" />
        </div>
        <div class="z-video-control-time">00:00</div>
        <div class="z-video-control-duration">00:00</div>
        <div class="z-video-control-sound">
          <Icon :type="isMute ? 'mute' : 'sound'" :size="20" @click="handleToggleMute" />
        </div>
        <div class="z-video-control-volume">
          <ZProgress :value="volume" height="10px" @on-click="handleChangeVolume" />
        </div>
        <div class="z-video-control-screen">
          <Icon :type="isFullScreen ? 'exit-full-screen' : 'full-screen'" :size="20" @click="handleToggleScreen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./z-video.js"></script>
<style src="./z-video.less" lang="less" scoped></style>
