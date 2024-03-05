import levels from '../data/levels.json'
import { ADD_MOVE, POP_MOVE, REMOVE_ALL_MOVES} from '../actions/actions'

const defaultState = {
    level:1,
    gameVars: levels[1],
    moves: []
}

const rootReducer = (state = defaultState, action) => 
{
    const lastMoves = [].concat(state.moves)
    switch(action.type)
    {
        case ADD_MOVE:
            lastMoves.push(action.move)
            return Object.assign({}, state, {moves:lastMoves})
        case POP_MOVE:
            lastMoves.pop()
            return Object.assign({}, state, {moves:lastMoves})
        case REMOVE_ALL_MOVES:
            return Object.assign({}, state, {moves:[]})
        default: return state
    }
}

export { rootReducer }