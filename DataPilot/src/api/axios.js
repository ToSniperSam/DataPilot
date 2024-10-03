import { Header } from 'antd/es/layout/layout'
import axios from 'axios'

const baseUrl = '/api'

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        return {
            baseUrl: this.baseUrl,
            Headers: {}
        }

    }

    interception(instance) {
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }



    request(options) {
        options = { ...this.getInsideConfig(), ...options }
        const instance = axios.create()
        this.interception(instance)
        return instance(options)
    }

}

export default new HttpRequest(baseUrl)