module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['app/data/*'],
                        dest: 'static/data',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: [
                    'node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/handlebars.runtime.js',
                    'app/components/director/build/director.js',
                    'app/js/helpers/*.js',
                    'app/js/templates/*.js',
                    'app/js/managers/*.js',
                    'app/js/routers/*.js',
                    'app/js/views/*.js',
                    'app/js/main.js'
                ],
                dest: 'static/js/all.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'static/js/all.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        handlebars: {
            options: {
                namespace: 'movieApp.Templates',
                processName: function(filePath) {
                    return filePath.replace(/^templates\//, '').replace(/\.html$/, '');
                }
            },
            all: {
                files: {
                    "app/js/templates/templates.js": ["app/templates/*.html"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['handlebars', 'concat', 'uglify']);

};