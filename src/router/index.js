import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 导入对应的路由
import discovery from "../views/01.discovery";
import playlists from "../views/02.playlists";
import playlist from "../views/06.playlist";
import songs from "../views/03.songs";
import mvs from "../views/04.mvs";
import mv from "../views/07.mv";
import result from "../views/05.result";


const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    // 发现音乐
    path: '/discovery',
    component: discovery
  },
  {
    // 推荐歌单
    path: '/playlists',
    component: playlists
  },
  {
    // 推荐歌单
    path: '/playlist',
    component: playlist
  },
  {
    // 最新音乐
    path: '/songs',
    component: songs
  },
  {
    // 最新音乐
    path: '/mvs',
    component: mvs
  },
  // mv详情
  {
    path: '/mv',
    component: mv
  },
  // 搜索结果页
  {
    path: '/result',
    component: result
  }
]

const router = new VueRouter({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
