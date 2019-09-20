<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-lg-42 z-col-xl-45">
        <Card padding="0">
          <Billboard :poster="blogResult.poster" :title="blogResult.title" :titleSub="blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日')">
            <div>
              <Tag size="small" theme="error" icon="user" shape="rect"> {{ blogResult.authorObj ? blogResult.authorObj.userName : '' }}</Tag>
              <Tag size="small" theme="info" shape="rect" v-for="(tag, index) in blogResult.tagArray" :key="index">{{ tag.name }}</Tag>
              <Btn v-if="isLiked" size="small" theme="success" shape="rect" icon="liked" @click="handleUnLike" :loading="isLikeLoading"></Btn>
              <Btn v-else size="small" theme="success" shape="rect" icon="like" @click="handleLike" :loading="isLikeLoading"></Btn>
              <Btn size="small" theme="primary" shape="rect" icon="download"></Btn>
            </div>
          </Billboard>
        </Card>
        <Card padding="0">
          <MdPreview :content="blogResult.content" />
        </Card>
        <Card>
          <CommentsForm @on-success="handleCommentsSuccess"></CommentsForm>
        </Card>

        <Card v-loading="isCommentsListLoading" v-if="commentsList && commentsList.length > 0">
          <CommentsList @on-fresh="requestCommentsList" :commentsList="commentsList"></CommentsList>
          <Pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
        </Card>
      </div>

      <div class="z-col-lg-18 z-col-xl-15 visible-lg visible-xl">
        <div id="briefWrap">
          <CardBriefBlog :blogResult="blogResult" v-if="blogResult && blogResult.content" />
          <CardNoData v-else style="height: 385px;" />
        </div>
        <div id="jsCardMdNav">
          <CardMdNav :blogResult="blogResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./blog-detail.js"></script>
<style lang="less" src="./blog-detail.less"></style>
