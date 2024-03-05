import { addMoveAction, popMoveAction, removeAllMovesAction } from "../actions/actions";
import Controls from "../components/Controls";
import { connect } from "react-redux";

const mapStateToProps = (state) =>
{
    return {
        level: state.level,
        controlsAvailable: state.gameVars.controls
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        addMove: (move) => { dispatch(addMoveAction(move)) },
        popMove: () => { dispatch(popMoveAction()) },
        removeAllMoves: () => {dispatch(removeAllMovesAction())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)