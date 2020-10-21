import React from "react";
import  "./Options.scss";
import Icons from "globals/icons/sprite.svg";
import { connect } from "react-redux";
import { deleteOption, updateOption } from "../../configurationSpecActions";
import * as Constants from "globals/constants/constants";


class OptionsItem extends React.Component {
    state = {
            value: "",
            label: ""
        }

    onDeleteIconClick = () => {
        this.props.deleteOption(this.props.option_id, this.props.conf_spec_id)
    }

    onInputUpdate = event => {
        event.persist()
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value
            }
        }))
        this.props.updateOption(this.props.option_id, this.props.conf_spec_id,
            {name: event.target.name, value: event.target.value.trim()})
    }

    render() {
        return (
            <div className="optionsWrapper">
                <div className="optionsIconWrapper">
                    <svg className="closeIcon" onClick={this.onDeleteIconClick}>
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>
                </div>
                <div className="inputDiv">
                    {Constants.VALUE_FIELD_TEXT}
                    <input type="text"
                           name="value"
                           className="customInput"
                           value={this.state.value}
                           onChange={this.onInputUpdate}
                           required
                    />
                </div>
                <div className="inputDiv">
                    {Constants.LABEL_FIELD_TEXT}
                    <input type="text"
                           name="label"
                           className="customInput"
                           value={this.state.label}
                           onChange={this.onInputUpdate}
                           required
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    deleteOption,
    updateOption
}

export default connect(null, mapDispatchToProps)(OptionsItem);
