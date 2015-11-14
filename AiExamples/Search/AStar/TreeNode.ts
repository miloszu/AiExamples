/// <reference path="../../Scripts/typings/tsd.d.ts" />


module Search.AStar {
 
    class TreeNode<TState>
    {
        constructor(public state: TState, public cost: number)
        { }
        parent: TreeNode<TState>;
        childern: TreeNode<TState>[];

        getCostToRoot(): number
        {
            if (this.parent != null)
            {
               return  this.cost + this.parent.getCostToRoot();
            }
            return this.cost;
        }
    }
}