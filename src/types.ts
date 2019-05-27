type ActionCreatorsMapObject = { [actionCreator: string]: (... args: any[]) => any }
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>
