import MovesView from "../components/MovesView";
import { connect } from "react-redux";

const mapStateToProps = (state) =>
{
    return { moves: state.moves }
}

export default connect(mapStateToProps, null)(MovesView)