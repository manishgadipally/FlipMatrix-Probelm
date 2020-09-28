var sizes;
var matrixArray;
var sumCountArray = [];

function solution(A) {
    matrixArray = A;
    sizes = getMatrixSize(matrixArray);
    var columnLength = sizes[1];
    var indexArray = getIndexArray(columnLength);
    for (var i = 0; i < columnLength; i++) {
        var data = [];
        getCombinations(indexArray, data, 0, columnLength - 1, 0, i + 1);
    }
    return Math.max(...sumCountArray);
}

function getIndexArray(size) {
    var data = [];
    for (var i = 0; i < size; i++) {
        data.push(i);
    }
    return data;
}

function getCombinations(arr, data, start, end, index, r) {
    if (index == r) {
        var finalRow = [];
        for (var i = 0; i < r; i++) {
            finalRow.push(data[i]);
        }
        flipAndCalculateSum(finalRow);
        return;
    }
    for (var i = start; i <= end && end - i + 1 >= r - index; i++) {
        data[index] = arr[i];
        getCombinations(arr, data, i + 1, end, index + 1, r);
    }
}

function flipAndCalculateSum(columnIndexArray) {
    var clonedArray = matrixArray.map(function(array) {
        return array.slice();
    });
    var flipResult = flipMatrixByColumnIndices(clonedArray, columnIndexArray);
    sumCountArray.push(getBinaryRowCount(flipResult));
}

function flipMatrixByColumnIndices(matrix, columnIndices) {
    for (var i = 0; i < columnIndices.length; i++) {
        matrix = flipMatrixByColumn(matrix, columnIndices[i]);
    }
    return matrix;
}

function getBinaryRowCount(matrix) {
    var count = 0;
    for (var i = 0; i < matrix.length; i++) {
        var rowSum = matrix[i].reduce(function(a, b) {
            return a + b;
        }, 0);
        if (rowSum == 0 || rowSum == sizes[1]) {
            count++;
        }
    }
    return count;
}

function flipMatrixByColumn(matrix, column) {
    for (var i = 0; i < matrix.length; i++) {
        matrix[i][column] = matrix[i][column] === 0 ? 1 : 0;
    }
    return matrix;
}

function getMatrixSize(arr) {
    var rowCount = arr.length;
    var rowSizes = [];
    for (var i = 0; i < rowCount; i++) {
        rowSizes.push(arr[i].length);
    }
    return [rowCount, Math.min.apply(null, rowSizes)];
}

solution([
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 1, 0]
]);