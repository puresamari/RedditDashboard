module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				options: {             
					style: 'compressed',
					sourcemap: 'none'
				},
				files: {                        
					'_dist/css/style.min.css': '_src/css/**/*.scss'
				}
			}
		},
		bowercopy: {
			options: {
				// Task-specific options go here 
			},
			bootstrap: {
				options: {
					destPrefix: '_dist'
				},
				files: {
					'css/lib' : 'bootstrap/**/bootstrap.min.css',
					'js/lib' : 'bootstrap/**/bootstrap.min.js'
				}
			},
			bootflat: {
				dest: '_dist/css/lib', 
				src : 'Bootflat/**/bootflat.min.css'
			},
			fontawesome: {
				files: {
					'_dist/css/lib': 'fontawesome/**/font-awesome.min.css',
					'_dist/css/fonts': 'fontawesome/fonts'
				}
			},
			jquery: {
				dest: '_dist/js/lib', 
				src : 'jquery/**/jquery.min.js'
			}
		},
		/*concat: {
			css: {
				src: '_src/css/libs/*.css',
				dest: '_dist/css/libs.min.css'
			},
			js: {
				src: '_src/js/libs/*.js',
				dest: '_dist/js/libs.min.js'
			},
			js: {
				src: '_src/html/*.html',
				dest: '_dist/index.html'
			}
		},*/
		compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: '_src/css/**/*.scss', // '_dist/css/style.min.css': '_src/css/**/*.scss'
					cssDir: '_dist/css/style.min.css',
					environment: 'production'
				}
			}
		},
		uglify: {
			options: {
				mangle: true
			},
			my_target: {
				files: {
					'_dist/js/main.min.js': '_src/js/main.js',
					'_dist/css/style.min.js': '_src/css/style.css'
				}
			}
		},
		htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'_dist/index.html': '_src/html/index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['sass', 'bowercopy',  'uglify', 'htmlmin']);
};