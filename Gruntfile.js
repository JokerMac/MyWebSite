/**
 * Created by HZB on 2017/4/19.
 */
module.exports = function (grunt) {
    var buildOptions = {
        concatJsFileOptions: {
            'dest/dev/app.dev.js': ['app.js', 'app.config.js', 'src/*.js'],
            'dest/dev/app_common.dev.js': ['src_framework/common/*.js'],
            'dest/dev/app_login.dev.js': ['src/login/**/*.js'],//'!src/login/base.js'感叹号表示排除这个文件
            'dest/dev/app_setting.dev.js': ['src/setting/**/*.js']
        }
        // concatLessFileOptions: {
        //     'dest/temp/style/app.default.min.less': ['src/skin/skin-00.less', 'src/base.less'],
        //     'dest/temp/style/app.red.min.less': ['src/skin/skin-01.less', 'src/base.less']
        // }
    };
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                // globals: {//全局变量配置，以后可能jQuery等外部库会用的上
                //     $: false,
                //     jQuery: false
                // },
                //我们的脚本需要在浏览器环境下执行，这样，我们的脚本中可以使用 console、setTimeout 等函数
                browser: true,
                jshintrc: '.jshintrc'
            },
            build: ['Gruntfile.js',
                'dest/dev/*.js',
                'test/**/*.js']
            // beforeconcat: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],//合并前检查
            //afterconcat: ['dest/**/*.js']//合并后检查
        },
        
        uglify: {
            options: {
                mangle: true,//混淆变量名
                stripBanners: true,//去除代码中的块注释
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */'
                // banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    src: ['dest/dev/*.js'],
                    dest: 'dest/pro',
                    cwd: '.',
                    rename: function (dest, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dest + '/' + src.replace('.js', '.min.js');
                        // Or to override to src:
                        var arr = src.split('/');
                        src = arr[arr.length - 1];
                        return dest + '/' + src.replace('.dev.js', '.min.js');
                    }
                }]
            },
            buildall: {//压缩混淆所有为一个文件
                src: ['dest/dev/*.js'],
                dest: 'dest/pro/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },
        
        less: {
            compile: {
                options: {
                    paths: ['MyWebSite'],
                    compress: true//是否压缩
                },
                files: {
                    'dest/style/app_control.min.css': ['src_framework/index.less'],
                    // 'dest/style/app.min.css': ['src/base.less'],
                    'dest/style/app.default.min.css': ['src/base.less'],
                    // 'dest/style/app.red.min.css': ['src/base.less'],
                    'dest/style/app_test.min.css': ['test/index.less']
                }
                // build: {
                //     expand: true,
                //     cwd: 'src',//编译路径
                //     src: '**/*.less',
                //     dest: 'dest/style',//生成文件路径
                //     ext: '.css'//文件扩展名
                // }
            }
        },
        
        concat: {
            options: {
                separator: '\n\n',
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.concat.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildJs: {
                files: buildOptions.concatJsFileOptions
            }
            // buildLess: {
            //     files: buildOptions.concatLessFileOptions
            // }
            // buildall: {//压缩混淆所有为一个文件
            //     src: ['dest/dev/*.js'],
            //     dest: 'dest/pro/<%=pkg.name%>-<%=pkg.version%>.min.js'
            // }
        },
        
        clean: {
            files: ['dest/*']
        },
        
        copy: {
            copyHtml: {
                files: [
                    {src: ['index.dev.html'], dest: 'index.html'}
                ]
            },
        },
        
        'string-replace': {
            replaceForDevelopment: {
                files: {'index.html': 'index.dev.html'},
                options: {
                    replacements: [{
                        pattern: /%versionForQueryString%/g,
                        replacement: 'version=' + grunt.template.today('yyyymmddHHMMss')
                    }]
                }
            },
            replaceForPublish: {
                files: {'index.html': 'index.dev.html'},
                options: {
                    replacements: [{
                        pattern: /%versionForQueryString%/g,
                        replacement: 'version=' + grunt.template.today('yyyymmddHHMMss')
                    }, {
                        pattern: /dest\/dev\//g,
                        replacement: 'dest/pro/'
                    }, {
                        pattern: /.dev.js/g,
                        replacement: '.min.js'
                    }]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');//合并
    grunt.loadNpmTasks('grunt-contrib-uglify');//压缩混淆
    grunt.loadNpmTasks('grunt-contrib-jshint');//代码错误提示
    grunt.loadNpmTasks('grunt-contrib-less');//less转为css
    grunt.loadNpmTasks('grunt-contrib-clean');//删除文件
    grunt.loadNpmTasks('grunt-contrib-copy');//复制
    grunt.loadNpmTasks('grunt-string-replace');//替换文件中的文本
    
    //开发使用：合并——查错——转css（包括css压缩）——js压缩混淆——复制index.dev.html为index.html——替换index.html中的%versionForQueryString%为日期
    grunt.registerTask('default', ['concat', 'copy', 'string-replace:replaceForDevelopment', 'jshint', 'less', 'uglify:build']);
    grunt.registerTask('debug', ['concat', 'copy', 'string-replace:replaceForDevelopment', 'jshint', 'less']);
    
    //删除——合并——查错——转css——压缩混淆——复制index.dev.html为index.html——替换index.html中的%versionForQueryString%为日期，js路径为pro，替换.dev.js为.min.js
    grunt.registerTask('publish', ['clean', 'copy', 'string-replace:replaceForPublish', 'concat', 'jshint', 'less', 'uglify:build']);
};

