<template>
  <div class="page">
    <BillBoard posterBlue="0" height="420px" sticky isHomePage poster="https://picsum.photos/1080/300?image=223">
      <div class="page-slogan">做一枚 <RotatingText :words="words" width="2em" /> 的前端</div>
      <div class="page-slogan-sub">To be a <RotatingText :words="words2" width="3.8em" /> front-end developer</div>
      <div class="banner-btn-wrap">
        <Btn theme="success" shape="circle" size="large" class="banner-btn" icon="github">Github</Btn>
        <Btn shape="circle" size="large" ghost class="banner-btn" :to="{ path: '/blog' }">进入博客</Btn>
      </div>
    </BillBoard>
    <div class="page-content">
      <section class="section-part section-part-module">
        <section-title title="WEB OVERVIEW" titleSub="网站模块介绍" desc="主要介绍网站各个模块用到了那些技术"></section-title>

        <div class="z-container">
          <div class="z-row">
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-12">
              <section-card title="前端文章" icon="artical" path="/blog">
                <div>Vue全家桶(vue, vue-router, vuex, axios)实现一套博客系统，支持 md 边写作边预览。</div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-12">
              <section-card title="前端资源" icon="link" theme="info" path="/resources">
                <div>前端添加资源链接，后台通过 puppeteer 截取网站屏幕，上传 ali-oss 阿里云。</div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-12">
              <section-card title="豆瓣电影" icon="movie" theme="success" path="/movie">
                <div>线上配置 nginx 转发请求到豆瓣开源 api, 前台自定义播放器，实现播放。</div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-12">
              <section-card title="电子书" icon="book" theme="warning" path="/ebook">
                <div>后台 通过 puppeteer 爬取笔趣阁网站内容，分析网页结构，提取数据，保存数据库。</div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-12">
              <section-card title="后台管理" icon="admin" theme="error" path="/admin">
                <div>采用 node.js 的 koa 开发框架, 搭建整个后台项目，采用 mogodb 作为数据库。pm2 管理 node 进程</div>
              </section-card>
            </div>
          </div>
        </div>
      </section>

      <section class="section-part section-part-profile">
        <section-title title="ABOUT ME" titleSub="自我介绍" theme="light"></section-title>

        <div class="z-container section-part-profile-container">
          <div class="z-col-sm-15">
            <div class="section-profile-left">
              <div class="section-profile-avatar-wrap">
                <img class="section-profile-avatar" src="https://picsum.photos/260/180?image=223" alt="" />
              </div>
              <ul class="section-profile-info">
                <li>
                  <span>90后</span>
                  <Icon type="age" :size="18" />
                </li>
                <li>
                  <span>天蝎座</span>
                  <Icon type="tianxie" :size="18" />
                </li>
                <li>
                  <span>通信工程</span>
                  <Icon type="tag" :size="18" />
                </li>
                <li>
                  <span>郑州轻工业</span>
                  <Icon type="school" :size="18" />
                </li>
                <li>
                  <span>302784355</span>
                  <Icon type="qq-empty" :size="18" />
                </li>
                <li>
                  <span>18203610462</span>
                  <Icon type="phone" :size="18" />
                </li>
              </ul>
            </div>
          </div>
          <div class="z-col-sm-45">
            <div class="section-profile-right">
              <div class="section-profile-name-wrap">
                <p class="section-profile-name">张晋佩·90后·天蝎座</p>
                <span class="section-profile-name-en">Zhangjinpei·Post-90s·Scorpio</span>
              </div>
              <div class="section-profile-desc-wrap">
                <p class="section-profile-desc">
                  一位比较腼腆的男青年，05年 毕业于 郑州轻工业大学 通信工程专业。大学期间，喜欢上 photoshop，
                  遂在图书馆中自学相关知识，并找到一份实习工作。用第一个月的实习工资，买了人生第一台单反相机，拍下了令人难忘的毕业照。
                  实习期间，接触到前端领域，并从此爱上了前端。但苦于无人带路，机缘巧合，从百度贴吧里知道北京葡萄藤学院可以培训相关技能，于是来到北京。这一待，就待到现在。
                  到目前为止，一共就职过四家公司。非常感恩这些公司以及曾经的同事们，与其说是工作，不如说是一直在学习。 目前的自己，仍有许多不足，但我相信，只要坚持不懈，总会也来越好。
                </p>
                <!-- <p class="section-profile-desc-en">
                  A shy young man graduated from Zhengzhou University of light industry in 2005. During the University, I like Photoshop, so I taught myself relevant knowledge in the library and found
                  an internship. With the first month's internship salary, I bought the first SLR camera in my life and took an unforgettable graduation photo. During the internship, I came into
                  contact with the front-end field and fell in love with the front-end from then on. However, due to no one leading the way and coincidence, I learned from Baidu Post Bar that Beijing
                  grapevine college can train relevant skills, so I came to Beijing. This time, stay till now. So far, I have worked in four companies. I'm very grateful to these companies and their
                  former colleagues, who have been studying rather than working. At present, I still have many shortcomings, but I believe that as long as we persevere, we will always get better.
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-part section-part-career">
        <section-title title="MY CAREER" titleSub="职业经历"></section-title>

        <div class="z-container">
          <section-timeline :times="times"></section-timeline>
        </div>
      </section>

      <section class="section-part section-part-project">
        <section-title title="MY PROJECT" titleSub="项目经验" desc="几个具有代表性的项目" theme="light"></section-title>
        <div class="z-container">
          <div class="z-row">
            <div class="z-col-sm-15">
              <div class="section-project-content">
                <div class="section-project-poster" :style="{ 'background-image': 'url(' + poster + ')' }"></div>
                <div class="section-project-info">
                  <h3 class="section-project-name">智慧餐厅管理后台</h3>
                  <p class="section-project-desc">web端：React、ant-design、echarts。<br />桌面端：利用 electron 打包成桌面应用。</p>
                </div>
              </div>
            </div>
            <div class="z-col-md-15">
              <div class="section-project-content">
                <div class="section-project-poster" :style="{ 'background-image': 'url(' + poster2 + ')' }"></div>
                <div class="section-project-info">
                  <h3 class="section-project-name">联想乐窗push后台</h3>
                  <p class="section-project-desc">Vue、vue-router、element-ui</p>
                </div>
              </div>
            </div>

            <div class="z-col-md-15">
              <div class="section-project-content">
                <div class="section-project-poster" :style="{ 'background-image': 'url(' + poster3 + ')' }"></div>
                <div class="section-project-info">
                  <h3 class="section-project-name">还到 app</h3>
                  <p class="section-project-desc">React-Native、自定义组价库</p>
                </div>
              </div>
            </div>

            <div class="z-col-md-15">
              <div class="section-project-content">
                <div class="section-project-poster" :style="{ 'background-image': 'url(' + poster4 + ')' }"></div>
                <div class="section-project-info">
                  <h3 class="section-project-name">自定义组件库</h3>
                  <p class="section-project-desc">将项目中积累的组件库，提取出来，方便以后持续迭代。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-part section-part-contact">
        <section-title title="FIND ME" titleSub="我的社区"></section-title>

        <div class="z-container">
          <ul class="contact-list">
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-github" target="_blank" rel="noopener noreferrer" href="https://github.com/love-peach/blog-front">
                <Icon type="github" :size="50" class="contact-list-item-icon"></Icon>
              </a>
            </li>
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-sf" target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/u/original_intention">
                <Icon type="iconsf" :size="50" class="contact-list-item-icon"></Icon>
              </a>
            </li>
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-npm" target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/react-native-unit-zjp">
                <Icon type="npm" :size="50" class="contact-list-item-icon"></Icon>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
}
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
.page-slogan {
  font-size: 36px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #fff;
}
.page-slogan-sub {
  font-size: 26px;
  color: #fff;
}
.banner-btn-wrap {
  margin-top: 30px;
  margin-bottom: 20px;
}
.banner-btn {
  width: 200px;
  padding: 7px 15px;
  font-size: 18px;
  margin: 20px 20px 0;
}
.section-part {
  // background-color: #fafafa;
  min-height: 300px;
  padding: 40px 20px 50px;
  // border: 1px solid #ccc;
}
.section-part-module {
}

.section-part-profile {
  position: relative;
  background-color: #333;
  background-image: url(./img/bg1.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .section-part-profile-container {
    max-width: 900px;
  }
  .section-profile-avatar-wrap {
    text-align: center;
    // border: 1px solid @colorWarning;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
  }
  .section-profile-avatar {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin: 0 auto;
  }

  .section-profile-info {
    // border: 1px solid @colorWarning;
    margin-top: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;

    li {
      padding: 8px 10px 8px 8px;
      text-align: right;
      color: #fff;
      span {
        font-size: 16px;
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      i {
        line-height: 1;
        vertical-align: baseline;
      }
    }
    li + li {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
  .section-profile-name-wrap {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 29px 15px;
    .section-profile-name {
      font-size: 26px;
      color: #fff;
      line-height: 1;
      font-weight: bold;
    }
    .section-profile-name-en {
      display: inline-block;

      padding-bottom: 6px;
      margin-top: 10px;
      margin-bottom: 3px;
      font-size: 17px;
      color: #ccc;
      line-height: 1;
    }
  }
  .section-profile-desc-wrap {
    margin-top: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 15px 15px 55px;
    .section-profile-desc {
      color: #f1f1f1;
      font-size: 15px;
      line-height: 1.7;
      text-align: justify;
    }
    .section-profile-desc-en {
      margin-top: 30px;
      color: #f1f1f1;
      font-size: 12px;
    }
  }
}
.section-part-career {
}
.section-part-project {
  background-color: #333;
  position: relative;
  background-color: #333;
  background-image: url(./img/bg2.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.section-part-module-btn {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.section-project-content {
  position: relative;
  padding-top: 61.8%;
  overflow: hidden;

  .section-project-poster {
    background-size: cover;
    position: absolute;

    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);
      transition: all ease 0.3s;
    }
  }
  .section-project-info {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all ease 0.3s;
  }
  .section-project-name {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
  .section-project-desc {
    margin-top: 20px;
    padding: 10px;
    color: #fff;
    width: 100%;
  }
}
.section-project-content:hover {
  .section-project-info {
    top: 0;
    opacity: 1;
  }
}
.contact-list {
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
  .contact-list-item {
    float: left;
    width: 33.33%;
    text-align: center;
  }
  .contact-list-item-link {
    position: relative;
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: inline-block;
    border: 1px solid @colorTextDisable;
  }
  .contact-list-item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .contact-list-item-link-github {
    &:hover {
      background-color: #24292e;
      color: #fff;
    }
  }
  .contact-list-item-link-sf {
    &:hover {
      background-color: #009a61;
      color: #fff;
    }
    .contact-list-item-icon {
      transform: translate(-50%, -60%);
    }
  }
  .contact-list-item-link-npm {
    &:hover {
      background-color: #cb3837;
      color: #fff;
    }
  }
}
</style>
