//3. Create a BST class

class BinarySearchTree {
    constructor(key = null, value = null, parent = null){
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
    insert(key, value){
      if(this.key == null){
        this.key = key;
        this.value = value;
      }
    
    else if(key < this.key){
  
      if(this.left == null){
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value)
      }
  
    } else {
      if(this.right == null){
        this.right = new BinarySearchTree(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
  }
  find(key){
    if(this.key == key){
      return this.value;
    }
    else if(key < this.key && this.left){
      return this.left.find(key);
    }
    else if(key > this.key && this.right){
      return this.right.find(key);
    }
    else{throw new Error('Key Error')}
  }
  remove(key){
    if(this.key == key){
      if(this.left && this.right){
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key)
      }
      else if(this.left){
        this._replaceWith(this.left)
      }
      else if(this.right){
        this._replaceWith(this.right)
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left){
      this.left.remove(key);
    } else if (key > this.key && this.right){
      this.right.remove(key);
    } else {throw new Error('Key Error')}
  }
  _replaceWith(node){
    if(this.parent){
      if(this == this.parent.left){
        this.parent.left = node;
      } else if (this == this.parent.right){
        this.parent.right = node;
      }
      if(node){
        node.parent = this.parent
      }
    } else {
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }
  }
  
  
  function main(){
    let NumTree = new BinarySearchTree()
    let numArr = [9, 1, 7, 8, 3, 2, 6, 5]
    
    for(i = 0; i < numArr.length; i++){
      NumTree.insert(numArr[i], numArr[i])
    }
    
    let LetterTree = new BinarySearchTree()
    let letterArr = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']
    
    for(i = 0; i < letterArr.length; i++){
      LetterTree.insert(letterArr[i], letterArr[i])
    }
    //NumTree.key = 100
    console.log(findThirdLargest(NumTree))
  }
  
  main()


  
  //4. What does this program do?

  function tree(t){
    //If there are no values in the tree, return 0.
    if(!t){
        return 0;
    }
    //Recur repeatedly through the tree, adding all values and eventually returning their total sum.
    return tree(t.left) + t.value + tree(t.right)
}

  

  //5. Height of a BST
  
  function treeHeight(inputTree){
    let total = 1
    const insertTree = inputTree
    treeCount(insertTree, total)
  
    function treeCount(insertTree, tot){
  
    if(insertTree.left){
      let newMax = tot + 1;
      treeCount(insertTree.left, newMax)
    }
    if(insertTree.right){
      let newMax = tot + 1;
      treeCount(insertTree.right, newMax)
    }
    else{if(tot > total){
      total = tot
    }}
    }
    return total
  
  }
  
  function checkTree(inputTree){



  //6. Is it a search tree
  
  let returnval = true
  isSearchTree(inputTree)
  
  function isSearchTree(inputTree){
    if((inputTree.left) && inputTree.left.key < inputTree.key){
      isSearchTree(inputTree.left)
    }
    if((inputTree.right) && inputTree.right.key > inputTree.key){
      isSearchTree(inputTree.right)
    }
    if((inputTree.left) && inputTree.left.key > inputTree.key){
      returnval = false
      return
    }
    if((inputTree.right) && inputTree.right.key < inputTree.key){
      returnval = false
      return
    }}
    return returnval
  }
  

  //7. Find third largest value

  function findThirdLargest(inputTree){
    let treeArray = []
    function iterateTree(inputTree){
      treeArray.push(inputTree.value)
    if(inputTree.right){
     iterateTree(inputTree.right)}
    if(inputTree.left){
      iterateTree(inputTree.left)}
  
   }
    iterateTree(inputTree)
    let sortedArray = treeArray.sort((a, b) => a < b)
    return sortedArray[2]
  }



  //8. Is it balanced
  
  function checkBalanced(inputTree){
    let leftright = 0
    let returnVal = true
    
  function BalanceRecur(inputTree, leftright){
    console.log(leftright)
    if(leftright > 1 || leftright < -1){
      returnVal = false
      return
    }
    if(inputTree.left){
      let newleftright = leftright - 1
      BalanceRecur(inputTree.left, newleftright)
    }
    if(inputTree.right){
      let newleftright = leftright + 1
      BalanceRecur(inputTree.right, newleftright)
    }}
  BalanceRecur(inputTree, leftright) 
  return returnVal
  }
  

  //9. Check if two arrays produce same tree
  
  function checkSame(arr1, arr2){
    if(arr1[0] !== arr2[0]){
      return false
      }
    if(arr1.length !== arr2.length){
      return false
    }
    let compareArr = []
    function checkRecur(array, num){
      if(array.length === 0){
        return
      }
      if(array.length === 1){
        compareArr.push(array[0])
        return}
  
      let rightArr = array.filter(arrNum => arrNum > num)
      let rightNum = rightArr.shift()
      compareArr.push(rightNum)
      checkRecur(rightArr, rightNum)
  
      let leftArr = array.filter(arrNum => arrNum < num)
      let leftNum = leftArr.shift()
      compareArr.push(leftNum)
      checkRecur(leftArr, leftNum)
    }
    let inputNum = arr1.shift()
  
    checkRecur(arr1, inputNum)
    checkRecur(arr2, inputNum)
  
    let contrastArr = compareArr.splice(0, (compareArr.length/2))
    
    for(i = 0; i < compareArr.length; i ++){
      if(compareArr[i] !== contrastArr[i]){
        return false
      }
    } return true
  }
  
  checkSame([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])
