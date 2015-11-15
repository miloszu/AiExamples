/// <reference path="../../typings/underscore/underscore.d.ts" />
import _ = require('underscore');

export module AStar {


    export class AStarEightPuzzle {


        constructor(private initalState: number[][], private desiredState: number[][]) {
            if (!this.checkSolvable(initalState)) {
                throw 'This combination is unsolvable.';
            }
        }


        private getCoordinatesOf(state: number[][], what: number): Xy {
            for (let y = 0; y <= state.length; y++) {
                const x = _.indexOf(state[y], what);
                if (x >= 0) {
                    return { x, y };
                }
            }
            return { x: -1, y: -1 };
        }

        checkSolvable(state: number[][]): Boolean {

            var unfolded = _.flatten(state);

            var inversions: number = 0;

            for (var i: number = 0; i < unfolded.length; i++) {
                for (var j: number = i + 1; j < unfolded.length; j++) {
                    if (unfolded[j] > unfolded[i]) {
                        inversions++;
                    }
                }
            }

            if (inversions % 2 == 1) {
                return false;
            } else {
                return true;
            }
        }


        solve(): number[][][] {

            const left = new Action<number[][]>();
            left.name = "Left";
            left.cost = 1;
            left.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.x > 0) {
                    state[emptyCell.y][emptyCell.x] = state[emptyCell.y][emptyCell.x - 1];
                    state[emptyCell.y][emptyCell.x - 1] = null;
                    return state;
                }
                return null;
            };
            const right = new Action<number[][]>();
            right.name = "Right";
            right.cost = 1;
            right.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.x < (state.length - 1)) {
                    state[emptyCell.y][emptyCell.x] = state[emptyCell.y][emptyCell.x + 1];
                    state[emptyCell.y][emptyCell.x + 1] = null;
                    return state;
                }
                return null;
            };
            const up = new Action<number[][]>();
            up.name = "Up";
            up.cost = 1;
            up.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.y > 0) {
                    state[emptyCell.y][emptyCell.x] = state[emptyCell.y - 1][emptyCell.x];
                    state[emptyCell.y - 1][emptyCell.x] = null;
                    return state;
                }
                return null;
            };
            const down = new Action<number[][]>();
            down.name = "Down";
            down.cost = 1;
            down.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.y < (state.length - 1)) {
                    state[emptyCell.y][emptyCell.x] = state[emptyCell.y + 1][emptyCell.x];
                    state[emptyCell.y + 1][emptyCell.x] = null;
                    return state;
                }
                return null;
            };

            const actions = [left, right, up, down];
            const manhattanDistance = (current: number[][], desired: number[][]) => {
                var cost = 0;
                desired.forEach(row => {
                    row.forEach(num => {
                        const actualLocation = this.getCoordinatesOf(current, num);
                        const desiredLocation = this.getCoordinatesOf(desired, num);
                        cost += Math.abs(actualLocation.x - desiredLocation.x) +
                        Math.abs(actualLocation.y - desiredLocation.y);
                    });
                });
                return cost;
            };
            const stateClone = (state: number[][]) => {
                var clone = [];
                state.forEach(row => {
                    clone.push(row.slice());
                });
                return clone;
            }

            var printState = (state: number[][]) => {
                for (var i = 0; i < state.length; i++) {
                    var line = "";
                    for (var j = 0; j < state[i].length; j++) {
                        if (state[i][j]) {
                            line += state[i][j] + "\t";
                        } else {
                            line += "\t";
                        }
                    }
                    console.log(line);
                }
            };

            const aStar = new AStarAlgorithm<number[][]>(this.desiredState, stateClone, actions, manhattanDistance, printState);
            const winNode = aStar.solve(this.initalState);
            var node = winNode;
            const states: number[][][] = [];
            states.push(node.state);
            do {
                node = node.parent;
                states.push(node.state);
            }
            while (node.parent != null)

            return states.reverse();
        }
    }

    export class TreeNode<TState> {
        constructor(public state: TState, public cost: number) {
        }

        parent: TreeNode<TState>;

        getCostToRoot(): number {
            if (this.parent != null) {
                return this.cost + this.parent.getCostToRoot();
            }
            return this.cost;
        }
    }

    export class Xy {
        x: number;
        y: number;
    }

    export class Action<TState> {
        name: string;
        cost: number;
        applyFunction: (state: TState) => TState;
    }

    export class AStarAlgorithm<TState> {
        frontier: TreeNode<TState>[];
        trunk: TreeNode<TState>;

        constructor(
            private desiredState: TState,
            private stateClone: (state: TState) => TState,
            private avaliableActions: Action<TState>[],
            private h: (current: TState, desired: TState) => number,
            private printState: (state: TState) => void) {
        }

        solve(initialState: TState): TreeNode<TState> {

            this.trunk = new TreeNode<TState>(initialState, 0);
            var frontier: TreeNode<TState>[] = [];
            var visitedState: TState[] = [];
            var toExpand = this.trunk;
            while (true) {
                this.avaliableActions.forEach(action => {
                    //expanding
                    var childState = action.applyFunction(this.stateClone(toExpand.state));
                    if (childState != null) {
                        var alreadyChecked = _.any(visitedState, (state) => { return _.isEqual(childState, state) });
                        if (!alreadyChecked) {
                            const childNode = new TreeNode<TState>(childState, action.cost);
                            childNode.parent = toExpand;
                            frontier.push(childNode);
                        }
                    }
                });

                toExpand = this.getNextToExpand(frontier);
                visitedState.push(toExpand.state);
                process.stdout.write('\033c');
                var nodeH = this.h(toExpand.state, this.desiredState);
                var nodeG = toExpand.getCostToRoot();
                console.log("g: " + nodeG + "\th: " + nodeH+ "\tg + h: "+ (nodeG + nodeH) + "\t Frontier Length: " + frontier.length + "\tVisited States: " + visitedState.length);
                this.printState(toExpand.state);

                frontier = _.without(frontier, toExpand);
                if (_.isEqual(toExpand.state, this.desiredState)) {
                    return toExpand;
                }
            }
        }

        getNextToExpand(frontier: TreeNode<TState>[]): TreeNode<TState> {
            const minNode = _.min(frontier, f => f.getCostToRoot() + this.h(f.state, this.desiredState));
            return minNode;
        }
    }


}