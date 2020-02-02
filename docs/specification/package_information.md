# Brace Document Mocha
### Package Specifications

----

### Brace Document Mocha help pages
* [Contributor code of conduct](https://github.com/restarian/brace_document_mocha/blob/master/docs/contributor_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_mocha/blob/master/docs/guidelines_for_contributing.md)
* [Synopsis](https://github.com/restarian/brace_document_mocha/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_mocha/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/brace_document_mocha/blob/master/docs/specification/unit_test_output.md)
----

**Version**: 1.1.3

**Description**: A plugin for Brace Document which generates a document pages the project mocha unit tests.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [bracket_print](https://npmjs.org/package/bracket_print) [mocha](https://npmjs.org/package/mocha)

**Development dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_link](https://npmjs.org/package/brace_document_link) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [brace_document_specification](https://npmjs.org/package/brace_document_specification)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document --navlink --link --link-dest ../Readme.md --link-path ../docs/synopsis.md -r -i docs_raw -b docs --force-title --title "Brace Document Mocha help pages" --sort depth --specification --mocha``` |

**Technologies used in development**:
  * [VIM](https://www.vim.org) As the primary IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) As the development operating environment
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) For unit testing
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and art rendering