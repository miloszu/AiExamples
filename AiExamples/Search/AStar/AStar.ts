/// <reference path="../../Scripts/typings/tsd.d.ts" />
/// <reference path="TreeNode.ts" />

module Search.AStar {
    class AStarAlgorithm<TState>
    {
        frontier: TreeNode<TState>[];
        trunk: TreeNode<TState>;
        
         constructor(
            private desiredState: TState,
            private avaliableActions: Action<TState>[],
            private h: (current: TState, desired: TState) => number)
        {
        }

        solve(initialState: TState): TreeNode<TState>
        {
             this.trunk = new TreeNode<TState>(initialState, 0);
             var frontier: TreeNode<TState>[] = [];

            while (true)
            {
                var toExpand = this.trunk;
                for (var action in this.avaliableActions)
                {
                    var childNode = action.applyFunction(toExpand);
                    frontier.push(childNode);
                }

                toExpand = this.getNextToExpand(frontier);
            }
            return this.trunk;
        }

        getNextToExpand(frontier: TreeNode<TState>[]): TreeNode<TState>
        {
            var minNode = _.min(frontier, f => f.getCostToRoot() + this.h(f.state, this.desiredState));
            return minNode;
        }

        applyAction(): void
        {

        }
    }
}