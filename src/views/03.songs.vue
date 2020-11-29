<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in lists" :key="index" class="el-table__row">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists['0'].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{item.duration|format}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from "axios";
import {time} from "../assets/js/common";

export default {
  name: 'songs',
  data() {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      tag: '0'
    };
  },
  watch:{
    tag(){
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods:{
    // 获取列表数据
    getList() {
      // 获取 最新音乐数据
      axios({
        url: 'https://autumnfish.cn/top/song',
        method: 'get',
        params: {
          // 传递 设置的数据
          type: this.tag
        }
      }).then(res => {
         //console.log(res)
        if(res.data.data.length>=15)
        {
          res.data.data= res.data.data.splice(0,15);
        }
        this.lists = res.data.data
        // 处理时长 毫秒 转为 分秒
        // for (let i = 0; i < this.lists.length; i++) {
        //   // // 获取 总毫秒数
        //   // let duration = this.lists[i].duration
        //   // let min = parseInt(duration / 1000 / 60)
        //   // if (min < 10) {
        //   //   min = '0' + min
        //   // }
        //   // let sec = parseInt((duration / 1000) % 60)
        //   // if (sec < 10) {
        //   //   sec = '0' + sec
        //   // }
        //   // // console.log(min + '|' + sec)
        //   // this.lists[i].duration = `${min}:${sec}`
        //   1.//将方法抽离
        //   this.lists[i].duration=time(this.lists[i].duration);
        // 2.用过滤器
        // }
      })
    },
    // 播放歌曲
    playMusic(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        method:'get',
        params:{
          id// id:id
        }
      }).then(res=>{
        // console.log(res)
        let url = res.data.data[0].url
        // console.log(this.$parent)
        // 直接获取父组件，可以修改任意的值
        this.$parent.musicUrl = url;
      })
    },
  },
  filters:{
  format(e){
    return time(e);
  }
  }
};
</script>

<style >

</style>
