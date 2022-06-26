// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "query", "symbols": ["filter"], "postprocess": id},
    {"name": "query", "symbols": ["not", "space", "filter"], "postprocess": 
        function (data) {
            return function negated(t) {
                return !data[2](t);
            }
        }
        },
    {"name": "filter", "symbols": ["nameFilter"]},
    {"name": "filter", "symbols": ["isFilter"], "postprocess": function (data) { return data[0] }},
    {"name": "not$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "not", "symbols": ["not$string$1"]},
    {"name": "space", "symbols": [{"literal":" "}]},
    {"name": "nameFilter$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "nameFilter", "symbols": ["nameFilter$string$1", "word"]},
    {"name": "isFilter$string$1", "symbols": [{"literal":"i"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "isFilter", "symbols": ["isFilter$string$1", {"literal":":"}, "status"], "postprocess": 
        function (data) {
            return data[2]
        }
        },
    {"name": "separator", "symbols": [{"literal":":"}]},
    {"name": "word$ebnf$1", "symbols": [/[\w]/]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "word", "symbols": ["word$ebnf$1"]},
    {"name": "status$string$1", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"m"}, {"literal":"p"}, {"literal":"l"}, {"literal":"e"}, {"literal":"t"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$1"], "postprocess": function (data) { return function isCompleted(t) { return t.state === 5 && (t.flags & (1<<4)) === 1<<4; } }},
    {"name": "status$string$2", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"u"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$2"]},
    {"name": "status$string$3", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"u"}, {"literal":"s"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$3"], "postprocess": function (data) { return function isQueued(t) { return (t.flags & (1<<4)) === 1<<4; }}},
    {"name": "status$string$4", "symbols": [{"literal":"d"}, {"literal":"o"}, {"literal":"w"}, {"literal":"n"}, {"literal":"l"}, {"literal":"o"}, {"literal":"a"}, {"literal":"d"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$4"], "postprocess": (data) => (t) => t.state === 3},
    {"name": "status$string$5", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"e"}, {"literal":"d"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "status", "symbols": ["status$string$5"], "postprocess": (data) => (t) => t.state === 5}
]
  , ParserStart: "query"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
