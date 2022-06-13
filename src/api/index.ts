// 所有接口 路径
export default {
  albumNewest: "/album/newest", // 最新专辑
  banner: "/banner", // 轮播图
  checkMusic: "/check/music", // 检查音乐是否 可用
  captchaSent: "/captcha/sent", // 发送验证码
  captchaVerify: "/captcha/verify", // 验证验证码
  getSongUrl: "/song/url", // 获取音乐 url
  getLyric: "/lyric", // 获取歌词
  loginCellphone: "/login/cellphone", // 手机号登录
  personalized: "/personalized", // 获取 推荐歌单
  personalizedDjprogram: "/personalized/djprogram", // 推荐电台
  playlistDetail: "/playlist/detail", // 歌单详情
  playlistTrackAll: "/playlist/track/all", // 歌单 - 歌曲列表
  newSong: "/personalized/newsong", // 推荐新音乐
  recommendResource: "/recommend/resource", // 每日推荐歌单 -- 需要登录
  recommendSongs: "/recommend/songs", // 每日推荐歌曲 -- 需要登录
  songDetail: "/song/detail", // 歌曲详情
  search: "/search", // 搜索
  searchDefault: "/search/default", // 默认搜索关键词
  searchHot: "/search/hot", // 热搜列表 (简略)
  searchHotDetail: "/search/hot/detail", // 热搜列表 (详细)
  searchSuggest: "/search/suggest", // 搜索建议
  searchMultimatch: "/search/multimatch", // 搜索多重匹配
  userAccount:'/user/account',// 登陆后 获取账号信息
};
