<template>
  <div>
    <ul class="comments-list">
      <li class="comments-list-item" v-for="comments in commentsList" :key="comments.id">
        <div class="comments-body">
          <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
            <img src="12" alt="" />
          </div>
          <div class="comments-main">
            <div class="comments-mate">
              <span class="comments-mate-username">{{ comments.from.userName }}</span>
              <span class="comments-mate-time">{{ comments.updatedAt | dateFormatFilter }}</span>
              <span v-if="commentId && commentId === comments.id" class="comments-mate-unrepay" @click="handleUnRepay(comments)">取消回复</span>
              <span v-else class="comments-mate-repay" @click="handleRepay(comments)">回复</span>
              <div class="comments-mate-order">#{{ comments.orderIndex }}</div>
            </div>
            <div class="comments-content">{{ comments.content }}</div>
            <ul class="repay-list" v-if="comments.reply && comments.reply.length > 0">
              <li class="repay-list-item" v-for="repay in comments.reply" :key="repay.id">
                <div class="comments-mate">
                  <span class="comments-mate-username">{{ repay.from.userName }}</span>
                  <span class="comments-mate-time">{{ repay.updatedAt | dateFormatFilter }}</span>
                </div>
                <div class="comments-content">{{ repay.content }}</div>
              </li>
            </ul>
            <div v-if="commentId && commentId === comments.id" style="margin-top: 10px;">
              <CommentsForm @on-success="handleCommentsSuccess" :commentId="commentId" :toUserId="toUserId"></CommentsForm>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./comments-list.js"></script>

<style lang="less" scoped>
.comments-list {
  position: relative;
  .comments-list-item {
    padding: 15px;
  }
  .comments-list-item + .comments-list-item {
    border-top: 1px solid @colorBorderLight;
  }
  .comments-list-item:hover .comments-mate-repay {
    display: inline;
  }

  .repay-list {
    margin: 10px 0 15px;
    background: @colorBg;
    padding: 10px;
    border-radius: 5px;
  }
  .repay-list-item {
    padding: 5px;
  }
  .repay-list-item + .repay-list-item {
    border-top: 1px solid @colorBorder;
  }

  .comments-body {
    display: flex;
    align-items: flex-start;
  }
  .comments-user {
    height: 50px;
    width: 50px;
    margin-right: 15px;
  }
  .comments-main {
    flex: 1;
  }
  .comments-content {
    text-align: justify;
    line-height: 1.75;
  }
  .comments-mate {
    margin-bottom: 5px;
    font-size: 12px;
  }
  .comments-mate-username {
    margin-right: 10px;
    color: @colorInfo;
  }
  .comments-mate-time {
    color: @colorTextLight;
    margin-right: 10px;
  }
  .comments-mate-repay {
    color: @colorError;
    cursor: pointer;
    display: none;
  }
  .comments-mate-unrepay {
    color: @colorError;
    cursor: pointer;
  }
  .comments-mate-order {
    float: right;
    font-size: 12px;
    color: @colorTextLight;
  }
}
</style>
