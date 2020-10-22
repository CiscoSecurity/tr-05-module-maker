import React from "react";
import "./Options.scss";
import OptionsItem from "./OptionItem";
import { addOptions } from "../../configurationSpecActions";
import { connect } from "react-redux";
import * as Constants from "globals/constants/constants";


class Options extends React.Component {
    onButtonClick = () => {
        this.props.addOptions(this.props.conf_spec_id)
    }

    render() {
        return (
            <div className="column">
                <div className="confSpecRow">
                    <div>
                        { Constants.OPTIONS_SECTION_LABEL }
                    </div>
                </div>
                {this.props.options.map(
                    elem => <OptionsItem key={elem.id}
                                         option_id={elem.id}
                                         conf_spec_id={this.props.conf_spec_id}
                    />
                    )
                }
                <button className="addNewButton" onClick={this.onButtonClick}>
                    { Constants.OPTIONS_BTN_TITLE }
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addOptions
}

export default connect(null, mapDispatchToProps)(Options)
