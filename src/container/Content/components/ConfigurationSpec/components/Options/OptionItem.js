import React from "react";
import  "./Options.scss"; //ToDo
import Icons from "globals/icons/sprite.svg";
import {connect} from "react-redux";
import {deleteOption} from "redux/actions";
import {updateOption} from "redux/actions";


class OptionsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            label: ""
        }
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
                    value
                    <input type="text"
                           name="value"
                           className="customInput"
                           value={this.state.value}
                           onChange={this.onInputUpdate}
                    />
                </div>
                <div className="inputDiv">
                    label
                    <input type="text"
                           name="label"
                           className="customInput"
                           value={this.state.label}
                           onChange={this.onInputUpdate}
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
