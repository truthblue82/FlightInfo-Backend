const axios = require('axios');

let token = process.env.MONSTER_SERVICE_TOKEN;
let url = process.env.MONSTER_SERVICE_API;
const instance = axios.create({
    baseURL: url
});

instance.interceptors.request.use(function (config) {
    config.headers.candidate = process.env.CANDIDATE;
    config.headers.authorization = `Bearer ${token}`;
    return config;
    }, function (error) {
    return Promise.reject(error);
    });

module.exports = instance;