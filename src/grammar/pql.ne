expr
    -> filter
    |  not space filter

filter
    -> nameFilter
    |  isFilter

not
    -> "not"

space
    -> " "

nameFilter -> "name:" word
isFilter -> "is" ":" status

separator -> ":"
word -> [\w]:+

status
    -> "completed"
    |  "queued"
    |  "paused"
    |  "downloading"
