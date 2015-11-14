/// <reference path="../../Scripts/typings/tsd.d.ts" />
/// <reference path="Xy.ts" />

module Search.AStar {
    export class AStarEightPuzzle
    {
        constructor(private initalState: number[][]) {
            
        }

        private getCoordinatesOf(state: number[][], what: number): Xy
        {
            for (var x = 0; x <= state.length; x++)
            {
                var y = _.indexOf(state[x], null);
                if (y >= 0)
                {
                    return { x, y };
                }
            }
            return { x: -1, y: -1 };
        }


        public solve(): Action<number[][]>[]
        {
            var left = new Action<number[][]>();
            left.name = "Left";
            left.cost = 1;
            left.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.x > 0) {
                    state[emptyCell.x][emptyCell.y] = state[emptyCell.x - 1][emptyCell.y];;
                    state[emptyCell.x - 1][emptyCell.y] = null;
                    return state;
                }
                return null;
            };

            var right = new Action<number[][]>();
            right.name = "Right";
            right.cost = 1;
            right.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.x < state.length) {
                    state[emptyCell.x][emptyCell.y] = state[emptyCell.x + 1][emptyCell.y];;
                    state[emptyCell.x + 1][emptyCell.y] = null;
                    return state;
                }
                return null;
            };

            var up = new Action<number[][]>();
            up.name = "Up";
            up.cost = 1;
            up.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.y < state.length) {
                    state[emptyCell.x][emptyCell.y] = state[emptyCell.x][emptyCell.y + 1];;
                    state[emptyCell.x][emptyCell.y + 1] = null;
                    return state;
                }
                return null;
            };


            var down = new Action<number[][]>();
            down.name = "Down";
            down.cost = 1;
            down.applyFunction = (state: number[][]) => {
                var emptyCell = this.getCoordinatesOf(state, null);
                if (emptyCell.y > 0) {
                    state[emptyCell.x][emptyCell.y] = state[emptyCell.x][emptyCell.y - 1];;
                    state[emptyCell.x][emptyCell.y - 1] = null;
                    return state;
                }
                return null;
            };

            var desiredState = [[1, 2, 3],
                                [4, 5, 6],
                                [7, 8, null]];

            var actions = [left, right, up, down];

            var manhattanDistance = (current: number[][], desired: number[][]) => {
                return 2;
            };
            var aStar = new AStarAlgorithm<number[][]>(desiredState, actions, manhattanDistance);
            var results = aStar.solve(this.initalState);
            return results;
        }
    }
}