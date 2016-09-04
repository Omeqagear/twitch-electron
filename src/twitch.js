import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.twitch.tv/kraken'
})

const Twitch = {
  api: (options) => {
    instance.defaults.headers.common['Authorization'] = 'OAuth ' + localStorage.getItem('AUTH_TOKEN');
    instance.defaults.headers.common['Accept'] = 'application/vnd.twitchtv.v3+json';

    if (options.params) {
      return instance.get(options.url, {params: options.params})
    }

    return instance.get(options.url)
  } 
}

export default Twitch
