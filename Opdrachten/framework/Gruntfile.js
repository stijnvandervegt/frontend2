module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),		
		concat: {			
			options: {
				seperator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
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
		}
	});	
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('prod', ['uglify']);
	grunt.registerTask('default', ['concat', 'uglify']);

};