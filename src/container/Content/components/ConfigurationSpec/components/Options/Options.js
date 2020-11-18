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
            <div>
                <div className="confSpecRow">
                    <div className="options-title">
                        { Constants.OPTIONS_SECTION_LABEL }
                        <button type="button" className="addNewButton" onClick={this.onButtonClick}>
                            { Constants.OPTIONS_BTN_TITLE }
                        </button>
                    </div>
                </div>
                {this.props.options.map(
                    elem => <OptionsItem key={elem.id}
                                         option={elem}
                                         conf_spec_id={this.props.conf_spec_id}
                    />
                    )
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    addOptions
}

export default connect(null, mapDispatchToProps)(Options)
