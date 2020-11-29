<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{$route.query.q}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲(双击播放音乐)" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
          <tr
                  v-for="(item, index) in songList"
                  :key="index"
                  class="el-table__row"
                  @dblclick="playMusic(item.id)"
          >
            <td>{{index+1}}</td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <!-- 歌名 -->
                  <span>{{ item.name }}</span>
                  <!-- mv的图标 -->
                  <span v-if="item.mvid != 0" class="iconfont icon-mv" @click="toMV(item.mvid)"></span>
                </div>
                <!-- 二级标题 -->
                <span v-if="item.alias.length != 0">{{ item.alias[0] }}</span>
              </div>
            </td>
            <td>{{ item.artists[0].name }}</td>
            <td>{{ item.album.name }}</td>
            <td>{{ item.duration|format }}</td>
          </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
                  v-for="(item, index) in playlists"
                  :key="index"
                  class="item"
                  @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount |count}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div v-for="(item, index) in mv" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount|count}}</div>
              </div>
              <!-- 持续时间 -->
              <span class="time">{{ item.duration|format }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import {time,count} from "../assets/js/common";

export default {
  name: 'result',
  data() {
    return {
      // tab切换时 会改变的数据
      activeIndex: 'songs',
      // 保存 查询歌曲
      songList: [],
      // 保存歌单的字段
      playlists: [],
      // 保存mv的字段
      mv: [],
      // 搜索结果的总数
      count: 0,
      searchValue:''    //用于搜索数据改变时刷新页面
    };
  },
  // 生命周期钩子 回调函数
  created() {
    this.searchValue=this.$route.query.q;
    //获取歌曲数据
    this.getMusic()
  },
  updated() {
    this.searchValue=this.$route.query.q;
  },
  methods:{
    // 去歌单详情页
    toPlaylist(id){
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    //放歌
    playMusic(id) {
      axios({
        url: 'https://autumnfish.cn/song/url',
        method: 'get',
        params: {
          id // id:id
        }
      }).then(res => {
        // console.log(res)
        let url = res.data.data[0].url
        // console.log(this.$parent.musicUrl)
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url
      })
    },
    // 去mv详情页
    toMV(id){
      this.$router.push(`/mv?q=${id}`)
    },
    //获取歌曲数据
    getMusic(){
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.q,
          type: 1,
          // 获取的数据量
          limit: 10
        }
      }).then(res => {
        // console.log(res)
        this.songList = res.data.result.songs
        // 保存总数
        this.count = res.data.result.songCount
      })
    }
  },
  // 侦听器
  watch: {
    activeIndex() {
      // songs 歌曲
      // lists 歌单
      // mv    mv
      let type = 1
      
      // 获取个数
      let limit = 10
      switch (this.activeIndex) {
        case 'songs':
          type = 1
          limit = 20
          break
        case 'lists':
          type = 1000
          limit = 20
          break
        case 'mv':
          type = 1004
          limit = 16
          break
        
        default:
          break
      }
      
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.q,
          type, // type:type,
          // 获取的数据量
          limit // limit: limit
        }
      }).then(res => {
        console.log(res)
        // 获取歌曲
        if (type == 1) {
          // 歌曲
          this.songList = res.data.result.songs
          // 保存总数
          this.count = res.data.result.songCount
        }
        // 获取 歌单
        else if (type == 1000) {
          // 歌单的逻辑
          this.playlists = res.data.result.playlists
          // 总数
          this.count = res.data.result.playlistCount
        } else {
          // 保存mv数据
          this.mv = res.data.result.mvs
          // 总数
          this.count = res.data.result.mvCount
        }
      })
    },
    //搜索数据改变时重新获取数据
    searchValue(){
      this.getMusic()
    },
    
  },
  //过滤器
  filters:{
    format(e){
      return time(e);
    },
    count(e){
      return count(e);
    }
  }
};
</script>

<style >

</style>
