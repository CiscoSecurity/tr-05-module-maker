import React from "react";
import "./Options.scss";
import OptionsItem from "./OptionItem";
import {addOptions} from "redux/actions";
import {connect} from "react-redux";


class Options extends React.Component {
    constructor(props) {
        super(props);
    }

    onButtonClick = event => {
        this.props.addOptions(this.props.conf_spec_id)
    }

    render() {
        return (
            <div className="column">
                <div className="confSpecRow">
                    <div>
                        Options
                    </div>
                </div>
                {this.props.options.map(elem => <OptionsItem key={elem.id} option_id={elem.id} conf_spec_id={this.props.conf_spec_id}/>)}
                <button className="addNewButton" onClick={this.onButtonClick}>
                    + Add another option
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addOptions
}

export default connect(null, mapDispatchToProps)(Options)