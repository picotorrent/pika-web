query
    -> filter {% id %}
    |  not space filter {%
    function (data) {
        return function negated(t) {
            return !data[2](t);
        }
    }
%}

filter
    -> nameFilter
    |  isFilter {% function (data) { return data[0] } %}

not
    -> "not"

space
    -> " "

nameFilter -> "name:" word

isFilter -> "is" ":" status {%
    function (data) {
        return data[2]
    }
%}

separator -> ":"
word -> [\w]:+

status
    -> "completed" {% function (data) { return function isCompleted(t) { return t.state === 5 && (t.flags & (1<<4)) === 1<<4; } } %}
    |  "queued"
    |  "paused" {% function (data) { return function isQueued(t) { return (t.flags & (1<<4)) === 1<<4; }} %}
    |  "downloading" {% (data) => (t) => t.state === 3 %}
    |  "seeding" {% (data) => (t) => t.state === 5 %}
