const normalArray = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random() * 1000));
const sparseArray = Array.from({ length: 100 }, (_, i) => i % 5 === 0 ? undefined : Math.floor(Math.random() * 1000));

console.log("Sorting normal array:");
console.log("Exchange Swap:", LibForSorting.exchangeSwap(normalArray));
console.log("Selection Sort:", LibForSorting.selectionSort(normalArray));
console.log("Insertion Sort:", LibForSorting.insertionSort(normalArray));
console.log("Shell Sort:", LibForSorting.shellSort(normalArray));
console.log("Quick Sort:", LibForSorting.quickSort(normalArray));

console.log("Sorting sparse array:");
console.log("Exchange Swap:", LibForSorting.exchangeSwap(sparseArray));
console.log("Selection Sort:", LibForSorting.selectionSort(sparseArray));
console.log("Insertion Sort:", LibForSorting.insertionSort(sparseArray));
console.log("Shell Sort:", LibForSorting.shellSort(sparseArray));
console.log("Quick Sort:", LibForSorting.quickSort(sparseArray));