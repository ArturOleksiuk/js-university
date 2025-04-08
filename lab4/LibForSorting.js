const LibForSorting = {
  checkSparse: function(arr) {
      let hasUndefined = false;
      arr.forEach((value, index) => {
          if (value === undefined) {
              hasUndefined = true;
              console.log("Array contains undefined values.");
          }
      });
      return hasUndefined;
  },
  stats: {
      comparisons: 0,
      swaps: 0,
      reset: function() {
          this.comparisons = 0;
          this.swaps = 0;
      },
      getStats: function() {
          return {
              comparisons: this.comparisons,
              swaps: this.swaps
          };
      },
      log: function() {
          console.log(`Comparisons: ${this.comparisons}, Swaps: ${this.swaps}`);
      }
  },
  exchangeSwap: function(arr, ascending = true) {
    let arrCopy = arr.slice();
    this.stats.reset();
    this.checkSparse(arrCopy);

    for(let i = 0; i < arrCopy.length - 1; i++) {
        for(let j = 0; j < arrCopy.length - 1 - i; j++) {
            if(arrCopy[j] === undefined) {
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
                this.stats.swaps++;
                continue;
            }
            
            if(arrCopy[j + 1] === undefined) continue;
            
            this.stats.comparisons++;
            if((ascending && arrCopy[j] > arrCopy[j + 1]) || (!ascending && arrCopy[j] < arrCopy[j + 1])) {
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
                this.stats.swaps++;
            }
        }
    }
    
    this.stats.log();
    return arrCopy;
  },
  selectionSort: function(arr, ascending = true) {
      let arrCopy = arr.slice();
      this.stats.reset();

      for(let i = 0; i < arrCopy.length - 1; i++) {
          let extremeIndex = i;
          for(let j = i + 1; j < arrCopy.length; j++) {
              if(arrCopy[j] === undefined) continue;
              if(arrCopy[extremeIndex] === undefined) {
                  extremeIndex = j;
                  continue;
              }
              this.stats.comparisons++;
              if((ascending && arrCopy[j] < arrCopy[extremeIndex]) || (!ascending && arrCopy[j] > arrCopy[extremeIndex])) {
                  extremeIndex = j;
              }
          }
          if(extremeIndex !== i) {
              [arrCopy[i], arrCopy[extremeIndex]] = [arrCopy[extremeIndex], arrCopy[i]];
              this.stats.swaps++;
          }
      }
      this.checkSparse(arrCopy);
      this.stats.log();
      return arrCopy;
  },
  insertionSort: function(arr, ascending = true) {
    this.stats.reset();
    let arrCopy = arr.slice();
    this.checkSparse(arrCopy);
    
    let validCount = 0;
    for(let i = 0; i < arrCopy.length; i++) {
        if(arrCopy[i] !== undefined) {
            if(i !== validCount) {
                arrCopy[validCount] = arrCopy[i];
                arrCopy[i] = undefined;
                this.stats.swaps++;
            }
            validCount++;
        }
    }
    for(let i = 1; i < validCount; i++) {
        let key = arrCopy[i];
        let j = i - 1;
        
        this.stats.comparisons++;
        while(j >= 0 && ((ascending && arrCopy[j] > key) || (!ascending && arrCopy[j] < key))) {
            arrCopy[j + 1] = arrCopy[j];
            j--;
            this.stats.swaps++;
            
            if(j >= 0) {
                this.stats.comparisons++;
            }
        }
        
        arrCopy[j + 1] = key;
    }
    
    this.stats.log();
    return arrCopy;
},

shellSort: function(arr, ascending = true) {
    this.stats.reset();
    let arrCopy = arr.slice();
    this.checkSparse(arrCopy);
    
    let validCount = 0;
    for(let i = 0; i < arrCopy.length; i++) {
        if(arrCopy[i] !== undefined) {
            if(i !== validCount) {
                arrCopy[validCount] = arrCopy[i];
                arrCopy[i] = undefined;
                this.stats.swaps++;
            }
            validCount++;
        }
    }
    
    let gap = Math.floor(validCount / 2);
    
    while(gap > 0) {
        for(let i = gap; i < validCount; i++) {
            let temp = arrCopy[i];
            let j = i;
            
            this.stats.comparisons++;
            while(j >= gap && ((ascending && arrCopy[j - gap] > temp) || (!ascending && arrCopy[j - gap] < temp))) {
                arrCopy[j] = arrCopy[j - gap];
                this.stats.swaps++;
                j -= gap;
                
                if(j >= gap) {
                    this.stats.comparisons++;
                }
            }
            
            arrCopy[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    this.stats.log();
    return arrCopy;
  },
  
  quickSort: function(arr, ascending = true) {
      this.stats.reset();
      const result = arr.slice();
      this.checkSparse(result);
  
      const _quickSort = (arr, low, high) => {
          if (low < high) {
              const pi = partition(arr, low, high);
              _quickSort(arr, low, pi - 1);
              _quickSort(arr, pi + 1, high);
          }
      }
  
      const partition = (arr, low, high) => {
          const pivot = arr[high];
          if (pivot === undefined) {
              for (let k = high - 1; k >= low; k--) {
                  if (arr[k] !== undefined) {
                      [arr[k], arr[high]] = [arr[high], arr[k]];
                      this.stats.swaps++;
                      break;
                  }
              }
          }
          
          let i = low - 1;
          for (let j = low; j < high; j++) {
              if (arr[j] === undefined) continue;
              if (arr[high] === undefined) continue;
              
              this.stats.comparisons++;
              if ((ascending && arr[j] <= arr[high]) || (!ascending && arr[j] >= arr[high])) {
                  i++;
                  [arr[i], arr[j]] = [arr[j], arr[i]];
                  this.stats.swaps++;
              }
          }
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          this.stats.swaps++;
          return i + 1;
      }
  
      _quickSort(result, 0, result.length - 1);
      this.stats.log();
      return result;
  }
}