/// <reference path="Scripts/typings/tsd.d.ts" />
/// <reference path="Scripts/Search/AStar/AStar.ts" />
console.log('Start.');
//Unsolvable:
//const initialState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [8, 7, null]
//];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
//d=8:
//const initialState = [
//    [2, 4, 3],
//    [1, 6, 8],
//    [7, 5, null]
//];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
//d = 12
//const initialState = [
//    [2, 4, 3],
//    [6, null, 8],
//    [1, 7, 5]
//];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
//d = 22
//const initialState = [
//    [null, 8, 4],
//    [1, 2, 3],
//    [6, 7, 5]
//];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
var initialState = [
    [1, null, 8],
    [3, 6, 7],
    [5, 4, 2]];
var desiredState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];
//Random unsolvable
//const initialState = [
//    [3, null, 4],
//    [2, 1, 6],
//    [5, 8, 7]];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
//Trivial:
//const initialState = [
//    [null, 1],
//    [3 , 2]
//];
//const desiredState = [
//    [1, 2],
//    [3, null]
//];
var printState = function (state) {
    for (var i = 0; i < state.length; i++) {
        var line = "";
        for (var j = 0; j < state[i].length; j++) {
            if (state[i][j]) {
                line += state[i][j] + "\t";
            }
            else {
                line += "\t";
            }
        }
        console.log(line);
    }
};
printState(initialState);
var aStarEightPuzzle = require("./Scripts/Search/AStar/AStar");
var puzzle = new aStarEightPuzzle.AStar.AStarEightPuzzle(initialState, desiredState);
console.log('Solving...');
var moves = puzzle.solve();
console.log('Solved.');
var display = function (stateIndex) {
    var state = moves[stateIndex];
    process.stdout.write('\033c');
    console.log("Solution:");
    printState(state);
    if (stateIndex < moves.length - 1) {
        stateIndex++;
        setTimeout(display, 1000, stateIndex);
    }
    else {
        setTimeout(display, 6000, 0);
    }
};
setTimeout(display, 1000, 0);
//# sourceMappingURL=app.js.map