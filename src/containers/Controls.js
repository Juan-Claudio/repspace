import { addMoveAction, popMoveAction, removeAllMovesAction, moveHeroAction, nextLevelAction, resetLevelAction, resetGameAction } from "../actions/actions";
import Controls from "../components/Controls";
import { connect } from "react-redux";

const mapStateToProps = (state) =>
{
    return {
        level: state.level,
        controlsAvailable: state.gameVars.controls,
        moves: state.moves,
        collisionMap: state.gameVars.collisionMap,
        heroPosition: [
            state.gameVars.hero[1],
            state.gameVars.hero[2]
        ],
        endPosition: state.gameVars.end,
        currPosition: state.currPosition,
        currOrientation: state.currOrientation,
        isWin: state.gameVars.isWin
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        addMove: (move) => { dispatch(addMoveAction(move)) },
        popMove: () => { dispatch(popMoveAction()) },
        removeAllMoves: () => {dispatch(removeAllMovesAction())},
        moveHero: (coor, orientation)=> {dispatch(moveHeroAction(coor, orientation))},
        nextLevel: ()=> {dispatch(nextLevelAction())},
        resetLevel: () => {dispatch(resetLevelAction())},
        resetGame: () => {dispatch(resetGameAction())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)