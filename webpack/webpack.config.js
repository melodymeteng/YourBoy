const path = require('path');
const devServer=require('webpack-dev-server')
const HtmlPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const glob=require('glob');
const PurifyCSSPlugin=require('purifycss-webpack');
const webpack=require('webpack');
const entry=require('./webpack_config/entry_webpack');
module.exports = {
    entry:entry,
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            { 
                test:/\.css$/,
                //use:['style-loader','css-loader']
                // use:ExtractTextPlugin.extract({
                //     fallback:'style-loader',
                //     use:'css-loader'
                // })
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{importLoaders:1}
                    },'postcss-loader']
                })
            },{
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }
                }]
            },{
                test:/\.(htm|html)$/i,
                loader:'html-withimg-loader'
            },{
                test:/\.scss/,
                use:ExtractTextPlugin.extract({
                    use:[{
                        loader:'css-loader'
                    },{
                        loader:'sass-loader'
                    }],
                    fallback:'style-loader'
                })
                // use:[
                //      {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     },
                //     {
                //         loader:'sass-loader'
                //     }
                // ]
            },{
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['env']
                    }
                }],
                exclude:'/node_modules/'
            },
        ]
    },
    plugins:[
        //new UglifyJsPlugin(), 压缩js代码
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:"./src/index.html"
        }),
        new ExtractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths:glob.sync("./src/*.html")
        }),
        new webpack.BannerPlugin('rtfghnjm'),
        // new webpack.ProvidePlugin({
        //     $:"jquery"
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'jquery',
        //     filename:"js/jquery.js",
        //     minChunks:2
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['jquery','vue'],
        //     filename:"js/[name].js",
        //     minChunks:2
        // })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8081'
    }
}