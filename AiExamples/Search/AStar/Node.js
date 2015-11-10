/// <reference path="../../Scripts/typings/tsd.d.ts" />
var Search;
(function (Search) {
    var AStar;
    (function (AStar_1) {
        var Node = (function () {
            function Node(state, cost) {
                this.state = state;
                this.cost = cost;
            }
            Node.prototype.getCostToRoot = function () {
                if (this.parent != null) {
                    this.cost + this.parent.getCostToRoot();
                }
                return this.cost;
            };
            return Node;
        })();
        var Action = (function () {
            function Action() {
            }
            return Action;
        })();
        var AStar = (function () {
            function AStar(avaliableActions) {
                this.avaliableActions = avaliableActions;
            }
            AStar.prototype.solve = function (initialState, desiredState) {
                this.trunk = new Node(initialState);
                var frontier = [];
                while (true) {
                    var toExpand = this.trunk;
                    for (var action in this.avaliableActions) {
                        var childNode = action.applyFunction(toExpand);
                        frontier.push(childNode);
                    }
                    toExpand = this.getNextToExpand(frontier);
                }
            };
            AStar.prototype.getNextToExpand = function (frontier) {
                _.min(frontier, function (f) { return f.getCostToRoot() +
                ; });
            };
            AStar.prototype.applyAction = function () {
            };
            return AStar;
        })();
        var AStarEightPuzzle = (function () {
            function AStarEightPuzzle(dimentions) {
                this.dimentions = dimentions;
            }
            Object.defineProperty(AStarEightPuzzle.prototype, "initialState", {
                set: function (initalState) {
                    this._initialState = initalState;
                },
                enumerable: true,
                configurable: true
            });
            AStarEightPuzzle.prototype.solve = function () {
                var left = new Action();
                left.name = "Left";
                left.cost = 1;
                var right = new Action();
                right.name = "Right";
                right.cost = 1;
                var up = new Action();
                up.name = "Up";
                up.cost = 1;
                var down = new Action();
                down.name = "Down";
                down.cost = 1;
                var aStar = new AStar([left, right, up, down]);
                var results = aStar.solve(this._initialState);
                //aStar.
            };
            return AStarEightPuzzle;
        })();
    })(AStar = Search.AStar || (Search.AStar = {}));
})(Search || (Search = {}));
//# sourceMappingURL=Node.js.map