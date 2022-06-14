// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expr", "symbols": ["filter"]},
    {"name": "expr", "symbols": ["not", "space", "filter"]},
    {"name": "filter", "symbols": ["nameFilter"]},
    {"name": "filter", "symbols": ["isFilter"]},
    {"name": "not$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "not", "symbols": ["not$string$1"]},
    {"name": "space", "symbols": [{"literal":" "}]},
    {"name": "nameFilter$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "nameFilter", "symbols": ["nameFilter$string$1", "word"]},
    {"name": "isFilter$string$1", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "isFilter", "symbols": ["isFilter$string$1", {"literal":":"}, "status"]},
    {"name": "separator", "symbols": [{"literal":":"}]},
    {"name": "word$ebnf$1", "symbols": [/[\w]/]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "word", "symbols": ["word$ebnf$1"]},
    {"name": "status$string$1", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"m"}, {"literal":"p"}, {"literal":"l"}, {"literal":"e"}, {"literal":"t"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$1"]},
    {"name": "status$string$2", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"u"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$2"]},
    {"name": "status$string$3", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"u"}, {"literal":"s"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$3"]},
    {"name": "status$string$4", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"w"}, {"literal":"n"}, {"literal":"l"}, {"literal":"o"}, {"literal":"a"}, {"literal":"d"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$4"]}
]
  , ParserStart: "expr"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
