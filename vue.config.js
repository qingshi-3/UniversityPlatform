module.exports = {
    devServer:{
        proxy:{
            'api' : {
                target: "http://c2984d7853.zicp.vip",
                changeOrigin:true,
                ws:false,
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
        }
    }
}