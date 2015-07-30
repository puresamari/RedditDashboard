module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				options: {             
					style: 'compressed',
					sourcemap: 'none',
					compass: true
				},
				files: {                        
					'_dist/css/style.min.css': '_src/css/**/*.scss'
				}
			},
			dev: {
				options: {
					sourcemap: 'none',
					compass: true
				},
				files: {                        
					'_dist/css/style.min.css': '_src/css/**/*.scss'
				}
			}
		},
		bowercopy: {
			bootstrap: {
				options: {
					destPrefix: '_dist'
				},
				files: {
					'css/lib' : 'bootstrap/**/bootstrap.min.css',
					'css/fonts' : 'bootstrap/fonts',
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
		uglify: {
			dist: {
				options: {
					mangle: true
				},
				files: {
					'_dist/js/main.min.js': '_src/js/main.js'
				}
			},
			dev: {
				options: {
					mangle: false
				},
				files: {
					'_dist/js/main.min.js': '_src/js/main.js'
				}
			}
		},
		htmlmin: {                                     
			dist: {                                     
				options: {                                 
					removeComments: true,
					collapseWhitespace: true
				},
				files: { 
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

	grunt.registerTask('logging', 'This tasks logs dev operations', function() {
		var tasks = ['sass:dev', 'bowercopy',  'uglify:dev', 'htmlmin'];
		
		grunt.log.writeln("Started Logging");
		
		var wordlistoptions = {
			separator: ', ',
			color: 'cyan',
		};
		
		grunt.log.write("Loaded Tasks: ");
		grunt.log.wordlist(tasks, [wordlistoptions]);
		
		
	});


	grunt.registerTask('default', ['sass:dist', 'bowercopy',  'uglify:dist', 'htmlmin']);
	grunt.registerTask('dev', ['sass:dev', 'bowercopy',  'uglify:dev', 'htmlmin']);
	//grunt.registerTask('logging', ['dev(["sass:dev", "bowercopy",  "uglify:dev", "htmlmin"])']);
};