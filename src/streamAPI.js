import axios from 'axios'

const clientId = process.env.ENV == 'development' ? '9itztcf66hbjxkud5i9ypfvrcmo5suw' : '4qe04be53ecrr1ya356a65qq8ms1szf'

export const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getAccessToken = (channel, videoId) => {
  var host = 'http://api.twitch.tv/api'
  var url  = videoId ? host + '/vods/' + videoId + '/access_token?client_id=' + clientId : host + '/channels/' + channel + '/access_token?client_id=' + clientId

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
