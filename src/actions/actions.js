//from Controls
const ADD_MOVE = 'ADD_MOVE'
const POP_MOVE = "POP_MOVE"
const REMOVE_ALL_MOVES = "REMOVE_ALL_MOVES"
const MOVE_HERO = "MOVE_HERO"
const NEXT_LEVEL = "NEXT_LEVEL"
const RESET_GAME = "RESET_GAME"
const RESET_LEVEL = "RESET_LEVEL"

const addMoveAction = (move) => { return { type:ADD_MOVE, move } }
const popMoveAction = () => { return {type: POP_MOVE} }
const removeAllMovesAction = () => { return { type: REMOVE_ALL_MOVES} }
const moveHeroAction = (coor, orientation) =>
{
    return { type:MOVE_HERO, coor, orientation }
}
const nextLevelAction = () => { return { type:NEXT_LEVEL } }
const resetGameAction = () => { return { type: RESET_GAME } }
const resetLevelAction = () => { return {type: RESET_LEVEL } }

export {
    ADD_MOVE, POP_MOVE, REMOVE_ALL_MOVES, MOVE_HERO,
     NEXT_LEVEL, RESET_GAME, RESET_LEVEL, addMoveAction,
     popMoveAction, removeAllMovesAction, moveHeroAction,
     nextLevelAction, resetGameAction, resetLevelAction
    }