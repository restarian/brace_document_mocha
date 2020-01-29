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

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

var it_will = global
global.module = module
var cache = utils.cacheManager(require)

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var err_msg = function(msg) {
		expect(false, msg).to.be.true
		done()
	}

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		it("requirejs is in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e;}})(), "unable to find the requirejs module").to.be.true
			it_will.stop = false 
			done()
		})

		it("mocha is available to the program", function(done) {
			it_will.stop = true 
			utils.Spawn("node", ["mocha", "-h"], {cwd: path.join(__dirname, "..", "node_modules", "mocha", "bin")}, function(exit_code, stdout, stderr) {

				expect(exit_code, stderr+stdout).to.equal(0)
				expect(stderr, stderr+stdout).to.be.empty
				it_will.stop = false 
				done()
			}, err_msg) 
		})
	})

	describe("is able to gather the mocha output", function(done) {

		this.timeout(6000)

		var cwd = path.join(__dirname, "example"), requirejs
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
		})
		afterEach(cache.dump.bind(cache))

		it("checking the acquireOutput API member using the entry script as the entry point", function(done) {
			
			requirejs(["./mocha_parser"], function(parser) {

				parser(function() {
					this.acquireOutput(function(content) {
						expect(content).to.include("using the entry script as the entry point")
						done()	
					}, err_msg) 
				}, err_msg) 
			})
		})

		it("checking the formatOutput API member using the entry script as the entry point", function(done) {
			
			requirejs(["./mocha_parser"], function(parser) {

				parser(function() {
					var This = this
					this.acquireOutput(function(content) {
						expect(content).to.include("using the entry script as the entry point")
							This.formatOutput("Brace Document Mocha Testing", content, function(out) {

							expect(out).to.include(" * Using stop further progression methodology for dependencies in: contentGeneration.js")
							expect(out).to.include("checking the formatOutput API member using the entry script as the entry point")
							done()
						}, err_msg)
					}, err_msg)
				})
			})
		})

	})
})

