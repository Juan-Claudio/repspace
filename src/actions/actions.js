//from Controls
const ADD_MOVE = 'ADD_MOVE'
const POP_MOVE = "POP_MOVE"
const REMOVE_ALL_MOVES = "REMOVE_ALL_MOVES"

const addMoveAction = (move) =>
{
    return { type:ADD_MOVE, move }
}
const popMoveAction = () =>
{
    return {type: POP_MOVE}
}
const removeAllMovesAction = () =>
{
    return { type: REMOVE_ALL_MOVES}
}

export {ADD_MOVE, POP_MOVE, REMOVE_ALL_MOVES, addMoveAction, popMoveAction, removeAllMovesAction}