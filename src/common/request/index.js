import axios from 'axios';

// axios.defaults.baseURL = 'http://hplqy.suoluomei.cn/index.php?s=/hfs/Api/'  //正式
axios.defaults.baseURL = 'http://activitytest.hpl001.cn/crm_api/app/sinceOrder/'; // 测试

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    (config) => {
        alert({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
        });
        return config;
    },
    (error) => Promise.reject(error),
);

axios.interceptors.response.use(
    (response) => response,
    () => {
        alert({
            title: '提示',
            message: '网络请求失败，反馈给客服',
        });
    },
);

export default function axiosApi(type, params, method = 'post') {
    const data = method === 'post' ? JSON.stringify(params) : params;
    return new Promise((resolve, reject) => {
        axios({
            method,
            url: type,
            data,
        })
            .then((res) => {
                if (res.data.errcode === 0) {
                    resolve(res.data);
                } else {
                    // 接口错误提示
                    alert(res.data.msg);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
