/**
 * Created by Zhangzc on 2017/9/8.
 */
import axios from 'axios'

const options = {}
options.baseURL = 'http://c.m.500.com/'
const _axios = axios.create(options)

const ajax = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
          if(/^\/ews\//.test(url)) {
            return response.data.data
          }
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        return resp
    })
}
ajax.get = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        return resp
    })
}
ajax.post = function (url, param, config) {
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        return resp
    })
}
export default ajax
