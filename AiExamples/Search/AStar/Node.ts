/// <reference path="../../Scripts/typings/tsd.d.ts" />


module Search.AStar {

    class Node<TState>
    {
        constructor(public state: TState, public cost: number)
        { }
        parent: Node<TState>
        childern: Node<TState>[]

        getCostToRoot(): number
        {
            if (this.parent != null)
            {
                this.cost + this.parent.getCostToRoot();
            }
            return this.cost;
        }
    }

    class Action
    {
        name: string;
        cost: number;
        applyFunction: Function;
    }

    class AStar<TState>
    {
        frontier: Node<TState>[]
        trunk: Node<TState>;
        

        constructor(private avaliableActions: Action[])
        {
        }

        solve(initialState: TState, desiredState: TState): Node<TState>
        {
            this.trunk = new Node<TState>(initialState);
            var frontier: Node<TState>[] = [];

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
            
        }

        getNextToExpand(frontier: Node<TState>[]): Node<TState>
        {
            _.min(frontier, f => f.getCostToRoot() + 
        }

        applyAction(): void
        {

        }
    }

    class AStarEightPuzzle
    {
        private _initialState: number[][];

        constructor(
            private dimentions)
        { }

        set initialState(initalState: number[][])
        {
            this._initialState = initalState;
        }

        solve(): void
        {
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

            var aStar = new AStar<number[][]>([left, right, up, down]);
            var results = aStar.solve(this._initialState);

            //aStar.
        }
    }
}