<template>
  <div class="md-editor-wrap">
    <div class="md-editor-toolbar">
      <div>
        <Btn theme="text">全屏</Btn>
        <Btn theme="text"  title="写作模式" @click="setEditorMode('editMode')">写作</Btn>
        <Btn theme="text" title="实时模式" @click="setEditorMode('liveMode')">实时</Btn>
        <Btn theme="text" title="预览模式" @click="setEditorMode('previewMode')">预览</Btn>
      </div>
      <slot></slot>
    </div>

    <div :class="`md-editor md-editor-${editorMode}`">
      <div class="md-editor-write">
        <textarea v-model="mdText"></textarea>
      </div>
      <div class="md-editor-preview">
        <div v-html="mdHtml" v-highlight></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="./md-editor.less"></style>
<script src="./md-editor.js"></script>
