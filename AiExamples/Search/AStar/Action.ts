/// <reference path="../../Scripts/typings/tsd.d.ts" />

module Search.AStar {
    export class Action<TState>
    {
        name: string;
        cost: number;
        applyFunction: (state: TState) => TState;
    }
}