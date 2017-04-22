/**
 * Created by HZB on 2017/4/19.
 */
module.exports = function (grunt) {
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
            // build: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
            beforeconcat: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],//合并前检查
            afterconcat: ['dest/**/*.js']//合并后检查
        },

        uglify: {
            options: {
                stripBanners: true,//去除代码中的块注释
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/test.js',
                dest: 'dest/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },

        less: {
            options: {
                paths: ['src']
            },
            build: {
                expand: true,
                cwd: 'src',//编译路径
                src: '**/*.less',
                dest: 'dest',//生成文件路径
                ext: '.css'//文件扩展名
            }
        },

        concat: {
            options: {
                separator: '\n\n',
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.concat.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'dest/concat/concat1.js': ['src/test.js', 'src/test2.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['less', 'concat', 'jshint', 'uglify']);
    grunt.registerTask('debug', ['less', 'concat', 'jshint']);
};

