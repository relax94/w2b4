"use strict";

var _natural = require("natural");

var _natural2 = _interopRequireDefault(_natural);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stemmer = _natural2.default.PorterStemmer;
var myString = "Hello my dear friend games";

var tokenizer = new _natural2.default.WordTokenizer();

console.log(tokenizer.tokenize(myString));
//# sourceMappingURL=nlp.js.map