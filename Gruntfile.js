/**
 * Gruntfile.js Controls
 *
 * @author Code Parrots <support@codeparrots.com>
 * @since 1.0.0
 */
module.exports = function(grunt) {

	'use strict';

	var pkg = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {

		pkg: pkg,

		jshint: {
			assets: [ 'lib/js/**/*.js', '!lib/js/**/*.min.js' ],
			gruntfile: [ 'Gruntfile.js' ]
		},

		uglify: {
			options: {
				ASCIIOnly: true
			},
			assets: {
				expand: true,
				cwd: 'lib/js/',
				src: [ '**/*.js', '!**/*.min.js' ],
				dest: 'lib/js/',
				ext: '.min.js'
			}
		},

		watch: {
			images: {
				files: [ 'lib/img/**/*.{gif,jpeg,jpg,png,svg}', 'wp-org-assets/**/*.{gif,jpeg,jpg,png,svg}' ],
				tasks: [ 'imagemin' ]
			},
			js: {
				files: [ 'lib/js/**/*.js', '!lib/js/**/*.min.js' ],
				tasks: [ 'jshint', 'uglify' ]
			}
		},

		imagemin: {
			options: {
				optimizationLevel: 3
			},
			assets: {
				expand: true,
				cwd: 'lib/img/',
				src: [ '**/*.{gif,jpeg,jpg,png,svg}' ],
				dest: 'lib/img/'
			},
			wp_org_assets: {
				expand: true,
				cwd: 'wp-org-assets/',
				src: [ '**/*.{gif,jpeg,jpg,png,svg}' ],
				dest: 'wp-org-assets/'
			}
		},

		replace: {
			base_file: {
				src: [ '<%= pkg.name %>.php' ],
				overwrite: true,
				replacements: [ {
					from: /Version: (.*)/,
					to: "Version: <%= pkg.version %>"
				} ]
			},
			readme_txt: {
				src: [ 'readme.txt' ],
				overwrite: true,
				replacements: [ {
					from: /Stable tag: (.*)/,
					to: "Stable tag: <%= pkg.version %>"
				} ]
			},
			readme_md: {
				src: [ 'README.md' ],
				overwrite: true,
				replacements: [ {
					from: /# (.*?) #/,
					to: "# <%= pkg.title %> v<%= pkg.version %> #"
				} ]
			},
			constants: {
				src: [ 'constants.php' ],
				overwrite: true,
				replacements: [ {
					from: /define\(\s*'TIMELINE_EXPRESS_DATE_TIME_VERSION',\s*'(.*)'\s*\);/,
					to: "define( 'TIMELINE_EXPRESS_DATE_TIME_VERSION', '<%= pkg.version %>' );"
				} ]
			}
		},

		clean: {
			pre_build: [ 'build/*' ],
		},

		copy: {
			package: {
				files: [
					{
						expand: true,
						src: [
							'*.php',
							'*.txt',
							'i18n/*.po',
							'i18n/*.mo',
							'lib/**',
						],
						dest: 'build/<%= pkg.name %>'
					}
				],
			}
		},

		compress: {
			main: {
				options: {
					archive: 'build/<%= pkg.name %>-v<%= pkg.version %>.zip'
				},
				files: [
					{
						cwd: 'build/<%= pkg.name %>/',
						dest: '<%= pkg.name %>/',
						src: [ '**' ]
					}
				]
			}
		},

		devUpdate: {
			packages: {
				options: {
					packageJson: null,
					packages: {
						devDependencies: true,
						dependencies: false
					},
					reportOnlyPkgs: [],
					reportUpdated: false,
					semver: true,
					updateType: 'force'
				}
			}
		},

		wp_readme_to_markdown: {
			options: {
				post_convert: function( readme ) {
					var matches = readme.match( /\*\*Tags:\*\*(.*)\r?\n/ ),
					    tags    = matches[1].trim().split( ', ' ),
					    section = matches[0];

							for ( var i = 0; i < tags.length; i++ ) {
								section = section.replace( tags[i], '[' + tags[i] + '](https://wordpress.org/plugins/tags/' + tags[i] + '/)' );
							}

					// Banner
					if ( grunt.file.exists( 'wp-org-assets/banner-772x250.jpg' ) ) {

						readme = readme.replace( '**Contributors:**', "![Banner Image](wp-org-assets/banner-772x250.jpg)\r\n\r\n**Contributors:**" );

					}

					// Tag links
					readme = readme.replace( matches[0], section );

					// Badges
					readme = readme.replace( '## Description ##', grunt.template.process( pkg.badges.join( ' ' ) ) + "  \r\n\r\n## Description ##" );

					return readme;
				}
			},
			main: {
				files: {
					'readme.md': 'readme.txt'
				}
			}
		},

		wp_deploy: {
			deploy: {
				options: {
					assets_dir: 'wp-org-assets/',
					plugin_slug: '<%= pkg.name %>',
					build_dir: 'build/<%= pkg.name %>/',
					deploy_trunk: true,
					deploy_tag: pkg.version,
					max_buffer: 1024*1024*10
				}
			}
		}

	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'default', [
		'menu'
	] );

	grunt.registerTask( 'Development tasks.', [
		'replace',
		'jshint',
		'uglify',
		'imagemin',
		'wp_readme_to_markdown'
	] );

	grunt.registerTask( 'Build the plugin.', [
		'Development tasks.',
		'compress'
	] );

	grunt.registerTask( 'Deploy to WordPres.org.', [
		'Build the plugin.',
		'wp_deploy'
	] );

	grunt.registerTask( 'Check grunt plugin versions.', [
		'devUpdate'
	] );

};
