import axios from 'axios'


export const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getAccessToken = (channel, videoId) => {
  var host = 'http://api.twitch.tv/api'
  var url  = videoId ? host + '/vods/' + videoId + '/access_token' : host + '/channels/' + channel + '/access_token'

  // Get access token
  return new Promise(function(resolve, reject) {
    axios
    .get(url)
    .then(
      (res) => {
        resolve(res.data)
      },
      (err) => {
        reject(err.data)
      }
    )
  })
}

export const getPlaylist = (channel, videoId) => {
  return getAccessToken(channel, videoId).then(
    (accessToken) => {
      let params = {
        player: 'twitchweb',
        allow_audio_only: true,
        allow_source: true,
        type: 'any',
        p: getRandomIntInclusive(1, 99999)
      }

      if (videoId) {
        params.nauth = accessToken.token;
        params.nauthsig = accessToken.sig;
      } else {
        params.token = accessToken.token;
        params.sig   = accessToken.sig;
      }

      const host = 'http://usher.twitch.tv/api'
      let url    = videoId ? host.replace('/api', '') + '/vod/' + videoId + '?' : host + '/channel/hls/' + channel + '.m3u8?'


      for  (var key in params) {
        url += key + '=' + encodeURIComponent(params[key]) + '&'
      }

      return url
    }
  )
}
