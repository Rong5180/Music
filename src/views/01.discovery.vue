<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
<!--      循环获取接口数据-->
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in list" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span  class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index" @click="toMV(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
<!--              播放次数-->
              <div class="num">{{ item.playCount|count }}</div>
            </div>
          </div>
          <div class="info-wrap">
<!--            mv名-->
            <div class="name">{{ item.name }}</div>
<!--            歌名-->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  //导入axios
  import axios from 'axios'
  import {count} from "../assets/js/common";

  export default {
  name: 'discovery',
  data(){
    return{
      banners:[],        //轮播图
      list:[],            //推荐歌单
      songs:[],            //最新音乐
      mvs:[],               //mv
    }
  },
  created() {
    //获取轮播图
  axios({
    url:'https://autumnfish.cn/banner',
    method:'get',
  }).then(res=>{
    this.banners=res.data.banners;
  })
    //推荐歌单
  axios({
    url:'https://autumnfish.cn/personalized',
    method:'get',
    params:{
      limit:10
    }
  }).then(res=>{
    this.list=res.data.result;
    // console.log(this.list);
  })
  
    // 最新音乐
    axios({
      url: 'https://autumnfish.cn/personalized/newsong',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.songs = res.data.result
    })
    
    //最新mv
    axios({
      url:'https://autumnfish.cn/personalized/mv',
      method:'get'
    }).then(res=>{
      this.mvs = res.data.result;
    })
  },
  filters:{
    //过滤播放次数，以万为单位显示
    count(e){
      return count(e);
    }
  },
  methods:{
    //播放音乐
    playMusic(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        method:'get',
        params:{
          id
        }
      }).then(res=>{
        //给父组件传值
        this.$parent.musicUrl=res.data.data[0].url;
      })
    },
    //去歌单页面
    toPlaylist(id){
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    // 去mv详情页
    toMV(id){
      this.$router.push(`/mv?q=${id}`)
    },
  },
  
};
</script>

<style >

</style>
