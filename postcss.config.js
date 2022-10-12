module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },

            // 配置要转换的css属性
            propList: ['*'],

            // 配置不要转换的文件
            exclude: 'markdown'
        },
    },
};