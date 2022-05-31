import axios from 'axios'
axios.defaults.baseURL='http://localhost:5001/api'
axios.defaults.withCredentials = true
const requestGenerico = {
    get:(url, params) => axios.get(url, params),
    post:(url, body) => axios.post(url,body),
    put:(url,body) => axios.put(url, body),
    delete:(url)=> axios.delete(url)
}
export default requestGenerico;