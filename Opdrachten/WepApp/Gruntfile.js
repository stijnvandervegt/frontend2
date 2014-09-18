module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: [
                    'app/components/handlebars/handlebars.js',
                    'app/components/director/build/director.js',
                    'app/js/managers/*.js',
                    'app/js/routers/*.js',
                    'app/js/views/*.js',
                    'app/js/helpers/*.js',
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
            all: {
                files: {
                    "app/js/templates/templates.js": ["app/templates/*.hbs"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', ['handlebars', 'concat', 'uglify']);

};