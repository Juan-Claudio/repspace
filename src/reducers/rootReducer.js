import levels from '../data/levels.json'
import { 
    ADD_MOVE, POP_MOVE, REMOVE_ALL_MOVES,
    MOVE_HERO, NEXT_LEVEL, RESET_GAME, RESET_LEVEL
} from '../actions/actions'

const defaultState = (level) => 
{
    return {
        level,
        gameVars: levels[level],
        moves: [],
        currPosition: [
            levels[level].hero[1],
            levels[level].hero[2]
        ],
        currOrientation: levels[level].hero[3]
    }
}

const rootReducer = (state = defaultState(1), action) => 
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
        case MOVE_HERO:
            return Object.assign({},state, {
                currPosition: [].concat(action.coor),
                currOrientation: action.orientation
            })
        case NEXT_LEVEL:
            return defaultState(state.level+1)
        case RESET_LEVEL:
            return defaultState(state.level)
        case RESET_GAME:
            return defaultState(1)
        default:
            return state
    }
}

export { rootReducer }