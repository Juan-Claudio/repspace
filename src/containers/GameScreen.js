import { connect } from "react-redux"
import GameScreen from "../components/GameScreen"

const mapStateToProps = (state) =>
{
    return {
        coorSystem: state.gameVars.coorSystem,
        background: state.gameVars.defaultTile,
        hero: state.gameVars.hero,
        currPosition: state.currPosition,
        currOrientation: state.currOrientation,
        drawingMap: state.gameVars.drawingMap
    }
}

export default connect(mapStateToProps, null)(GameScreen)