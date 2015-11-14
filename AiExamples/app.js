var initialState = [[8, null, 9],
    [6, 1, 6],
    [5, 8, 7]];
var puzzle = new Search.AStar.AStarEightPuzzle(initialState);
console.log('Solving...');
var actionsToSolve = puzzle.solve();
console.log('Solved.');
var state = initialState;
var display = function (actionIndex) {
    var action = actionsToSolve[actionIndex];
    actionIndex++;
    console.clear();
    console.log(state);
    state = action.applyFunction(state);
    if (actionIndex <= actionsToSolve.length) {
        setTimeout(display, 500, actionIndex);
    }
};
setTimeout(display, 500, 0);
//# sourceMappingURL=app.js.map