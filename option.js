module.exports = [
	{ 
		"usage": 
`  Creates a document page from a the output of a benign mocha unit test run-through. The unit tests are not actually ran 
as the brace_maybe module will prevent the test logic from evaling. Therefore, whether or not the tests are passing or 
failing is moot. The new document is placed from the project root directory and secified by the --mocha-path option.`
	},
	{
		"flag": "--mocha-path <path>", 
		"help": "The location and file name to place the generated document. he directory will on be created if nessesary and is relative to the docs " +
			" directory.",
		"default": "specification/unit_test_output.md"
	},
]

