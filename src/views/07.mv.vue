<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls autoplay :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：2014-11-04</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论
          <span class="number">({{ hotCount }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div v-for="(item, index) in hotComment" :key="index" class="item">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <!-- 昵称 -->
                <span class="name">{{ item.user.nickname }}:</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- 评论的回复 -->
              <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                  >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">( {{total}} )</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length!=0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next"
              :total="total"
              :current-page="page"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMvs" :key="index" class="item" @click="change(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount |count}}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入 axios
  import axios from "axios";
  import {count} from "../assets/js/common";

  export default {
    name: "mv",
    data() {
      return {
        //mvId
        mvId:0,
        // 总条数
        total: 0,
        // 页码
        page: 1,
        // 页容量
        limit: 10,
        // mv地址
        url: "",
        // 相关mv
        simiMvs: [],
        // mv的信息
        mvInfo: {},
        // 头像
        icon:'',
        // 热门评论
        hotComment: [],
        // 热门评论的个数
        hotCount: 0,
        // 普通评论
        comments:[]
      };
    },
    created() {
      this.$parent.stop();
      this.mvId=this.$route.query.q;
      this.getMv()
    },
    methods: {
      //获取mv信息
      getMv(){
        // 获取mv播放地址
        axios({
          url: "https://autumnfish.cn/mv/url",
          method: "get",
          params: {
            // 获取url中的 id
      
            id: this.mvId
          }
        }).then(res => {
          // console.log(res)
          this.url = res.data.data.url;
        });
        // 获取 相关的mv
        axios({
          url: "https://autumnfish.cn/simi/mv",
          method: "get",
          params: {
            mvid: this.mvId
          }
        }).then(res => {
          // console.log(res)
          // 保存相关MV
          this.simiMvs = res.data.mvs;
        });
  
        // 获取 mv的信息
        axios({
          url: "https://autumnfish.cn/mv/detail",
          method: "get",
          params: {
            mvid: this.mvId
          }
        }).then(res => {
          // console.log(res)
          // mv的信息
          this.mvInfo = res.data.data;
          // 获取 歌手信息
          axios({
            url: "https://autumnfish.cn/artists",
            method: "get",
            params: {
              id: this.mvInfo.artists[0].id
            }
          }).then(res => {
            // console.log(res);
            // 歌手的封面信息
            this.icon = res.data.artist.picUrl
          });
        });
  
        // 获取评论数据
        axios({
          url:"https://autumnfish.cn/comment/mv",
          method:'get',
          params:{
            id:this.mvId,
            limit:10,
            offset:0
          }
        }).then(res=>{
          console.log(res);
          this.hotComment = res.data.hotComments;
          // 保存个数
          this.hotCount = res.data.total;
          // 总个数
          this.total = res.data.total
          // 评论数据
          this.comments = res.data.comments
        })
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // 保存页码
        this.page = val
        // 重新获取数据
        axios({
          url:"https://autumnfish.cn/comment/mv",
          method:"get",
          params:{
            id:this.$route.query.q,
            limit:10,
            // 根据页码计算
            offset:(this.page-1)*10
          }
        }).then(res=>{
          // console.log(res)
          // 总个数
          this.total = res.data.total
          // 评论数据
          this.comments = res.data.comments
        })
      },
      // change
      change(id){
        this.mvId=id;
        this.getMv()
      },
    },
    filters:{
      count(e){
        return count(e);
      }
    }
  };
</script>

<style></style>
