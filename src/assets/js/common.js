import axios from "axios";

function time(t) {//格式化歌曲播放时间
  let min = parseInt(t / 1000 / 60)
  let sec = parseInt(t / 1000 % 60)
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  return  min + ':' + sec;
}

function count(t) {
  if (t > 100000) {
    return parseInt(t / 10000) + '万'
  }
  else return t;
}


export {
  time,count
}