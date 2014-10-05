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
                    'js/components/underscore/underscore.js',
                    'js/components/director/build/director.js',
                    'js/templates.js',
                    'js/function.js'
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
                namespace: 'Views',
                processName: function(filePath) {
                    return filePath.replace(/^templates\//, '').replace(/\.html$/, '');
                }
            },
            all: {
                files: {
                    "js/templates.js": ["templates/*.html"]
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