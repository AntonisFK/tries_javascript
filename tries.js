
var node = {
    key : null
  , value : null
  , children : []
}

function Trie() {
  this.head = {
      //the head is always empty 
      key : ''
    , children: {}
  }
}

Trie.prototype.add = function(key) {

// add method has two while loops. The first looks for an appropriate place to insert an element and the second iterates through 
//the remaining characters of the string, filling out the trie

  var curNode = this.head
    , newNode = null
    , curChar = key.slice(0,1);
    //curChar saves the first element from the key 
  key = key.slice(1);
// key = whole key minus the first element 
  while(typeof curNode.children[curChar] !== "undefined" 
    && curChar.length > 0){
   //how to move to the next node 
    curNode = curNode.children[curChar];
   //save the first element of the key. 
    curChar = key.slice(0,1);
    // remove the first elment from the key 
    key = key.slice(1);
  }

  while(curChar.length > 0) {
    newNode = {
        key : curChar
      , value : key.length === 0 ? null : undefined
      , children : {}
    };

    //insert the new node 
    curNode.children[curChar] = newNode;

    //set curNode to newNode 
    curNode = newNode;

    //save first element 
    curChar = key.slice(0,1);
    //whole word minus the first element 
    key = key.slice(1);
  }

};
//The search method returns the depth of the given key or -1 if it does not find any.
Trie.prototype.search = function(key) {
  var curNode = this.head
    , curChar = key.slice(0,1)
    , d = 0;
  

  key = key.slice(1);

  while(typeof curNode.children[curChar] !== "undefined" && curChar.length > 0){
    curNode = curNode.children[curChar];
    curChar = key.slice(0,1);
    key = key.slice(1);
    d += 1;
  }

  if (curNode.value === null && key.length === 0) {
    return d;
  } else {
    return -1;
  }

}

Trie.prototype.remove = function(key) {
  var d = this.search(key);
  if (d > -1){
    removeH(this.head, key, d);
  }
}

function removeH(node, key, depth) {
  if (depth === 0 && Object.keys(node.children).length === 0){
    return true;
  } 

  var curChar = key.slice(0,1);

  if (removeH(node.children[curChar], key.slice(1), depth-1)) {
    delete node.children[curChar];
    if (Object.keys(node.children).length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
