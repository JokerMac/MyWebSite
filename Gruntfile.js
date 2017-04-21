/**
 * Created by HZB on 2017/4/19.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            build: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        uglify: {
            options: {
                stripBanners: true,
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
            src: {
                expand: true,
                cwd: 'src',//编译路径
                src: '*.less',
                dest: 'dest',//生成文件路径
                ext: '.css'//文件扩展名
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less', 'jshint', 'uglify']);
    grunt.registerTask('debug', ['jshint', 'uglify']);
};

