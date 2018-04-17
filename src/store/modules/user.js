import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        }
    }
    ,
    actions:{
        // 用户名登录
        // LoginByUsername({ commit }, userInfo) {
        //     const username = userInfo.username.trim()
        //     return new Promise((resolve, reject) => {
        //         loginByUsername(username, userInfo.password).then(response => {
        //             const data = response.data
        //             commit('SET_TOKEN', data.token)
        //             setToken(response.data.token)
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
    }
};

export default user;
