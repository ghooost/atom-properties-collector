# atom-properties-collector package

##Object properties collector.

###Example:
Toggle the plugin ON (ctrl-alt-c), type myObject and press Enter.
It will scan text at ActiveTextEditor for myObject.XXX
and then insert myObject definition at cursor position.

```
myfile.js

//<---------this code will be generated
var myObject={
    START:"myfile.js:start",
    PASTE:"myfile.js:paste",
    STOP:"myfile.js:stop"
};
//<---------

switch(action){
  case myObject.START:
  ...
  break;
  case myObject.PASTE:
  ...
  break;
  case myObject.STOP:
  ...
  break;
}
```
