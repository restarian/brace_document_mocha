/*  Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com> -- MIT license

Brace Document Mocha resides under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

  this file is a part of Brace Document Mocha

  Brace Document Mocha is plugin for Brace Document which created links to pages. 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

var fs = require("fs"),
	path = require("path")
	EOL = require("os").EOL

define(["bracket_print", "bracket_utils"], function(print, utils) {

	var def = function(up, cb, err) {

		// This iterator returns an instanced link of the module regardless if the new keyword is used.
		var call_instance
		if ( !(this instanceof (call_instance = def) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		// The simplest way to determine if the argument is of the bracket_print type.
		if ( up && up.parent && (up instanceof up.parent) )
			this.up = up = up.spawn(up.log_title+" -> ")
		else {
			if ( typeof up === "function" ) {
				err = cb
				cb = up
			}
			this.up = up = print({title: true, title_stamp: false})
		}

		cb = typeof cb === "function" && cb || function(){}
		err = typeof err === "function" && err || function(){}

		up.log_title = up.log_title + "mocha_parser"
		this.up_err = up.spawn({title: true, level: 2, title_stamp: false, title: up.log_title+" - ERROR:"})

		this.parser = {}
		this.option = {
			mochaPath: "specification/unit_test_output.md"
		}

		cb.call(this)

	}

	def.prototype = {

		acquireOutput: function(dir, cb, err) {

			if ( typeof dir === "function" ) {
				err = cb
				cb = dir
				dir = this.parser.project_root
			}

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up = this.up.spawn(this.up.log_title + " - acquireOutput()")
			var up_err = this.up_err.spawn(up.log_title + " - ERROR")
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) } 
			// ----------------------------------------------------------------------------------------------------

			up.log("Fetching mocha unit test outline.")
			utils.Spawn("node", [path.join("node_modules", "mocha", "bin", "mocha"), "--require", "brace_maybe/override", "--no-colors"], {cwd: dir}, 
			function(exit_code, stdout, stderr) {
				if ( stderr )
					err(up_err.log("The acquireOutput command failed. Unable to locate mocha entry.", stderr))
				else
					cb(stdout)
			}, err)
		},
		formatOutput: function(title, content, cb, err) {

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up = this.up.spawn(this.up.log_title + " - formatOutput()")
			var up_err = this.up_err.spawn(up.log_title + " - ERROR")
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) } 
			// ----------------------------------------------------------------------------------------------------

			up.log("Formating unit test output.")
			if ( !content.trim() )
				cb()

			var format = content
			// Add a asterisk to before the text in each line.
			.replace(/\s(\S.*$)/gm, " * $1"+EOL)
			// Turn all double spaces into one.
			.replace(/(?:\n|\r\n){2}/g, EOL)
			// The milliseconds at the end is unnecessary.
			.replace(/passing \(.*\)/, "passing")

			cb(print({style: false, level: 0, log_level: "", title: false, title_stamp: false})
				.s("#", title).l("### Output of unit testing", " ", "----", "### Document Pages", "----", " ", 
					"### ---------- Start of unit testing ----------", format,
					"### ---------- End of unit testing ----------" ).toString())
		},
	}

	return def

})
