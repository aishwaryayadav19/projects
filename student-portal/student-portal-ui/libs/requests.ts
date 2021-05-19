import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8484'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const get = async (url: string) => axios.get(url, { headers })

const post = async (url: string, data: Number | String | Object | Array<any>) => axios.post(url, data, { headers })

const put = async (url: string, data: Number | String | Object | Array<any>) => axios.put(url, data, { headers })

const del = async (url: string, data: Number | String | Object | Array<any> = {}) =>
  axios.delete(url, { data, headers })

export { get, post, put, del }
