import natural from 'natural'
var stemmer = natural.PorterStemmer;
var myString = "Hello my dear friend games";

var tokenizer = new natural.WordTokenizer();

console.log(tokenizer.tokenize(myString))
