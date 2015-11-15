/// <reference path="Scripts/typings/tsd.d.ts" />
/// <reference path="Scripts/Search/AStar/AStar.ts" />
console.log('Start.');
//const initialState = [[8, null, 9],
//    [2, 1, 6],
//    [5, 8, 7]];
//const desiredState = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, null]
//];
var initialState = [
    [null, 1],
    [3, 2]
];
var desiredState = [
    [1, 2],
    [3, null]
];
var printState = function (state) {
    for (var i = 0; i < state.length; i++) {
        console.log(state[i]);
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
    console.log('\033[2J'); // clear
    console.log("Solution:");
    printState(state);
    if (stateIndex < moves.length - 1) {
        stateIndex++;
        setTimeout(display, 1500, stateIndex);
    }
};
setTimeout(display, 1000, 0);
//# sourceMappingURL=app.js.map