import React from "react";
import "./ConfigurationSpecItem.scss"
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";
import Options from "../Options/Options";
import { connect } from "react-redux";
import { deleteConfSpec, deleteAllOptions, updateConfSpec, addOptions }
from "../../configurationSpecActions";


class ConfigurationSpecItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
            key: "",
            type: "",
            label: "",
            tooltip: "",
            subtype: "",
            required: false,
            group: "",
        }
    }
    onSelectChange = (event) => {
        this.onInputChange(event);
        if (event.target.value === 'options') {
            this.props.addOptions(this.props.role);
            this.setState({showOptions: true})
        }
        else {
            this.props.deleteAllOptions(this.props.role);
            this.setState({showOptions: false});
        }
    }
    onDeleteIconClick = () => {
        this.props.deleteConfSpec(this.props.role);
    }

    onInputChange = (event) => {
        event.persist()
        let value = '';
        if (event.target.type === "checkbox"){
            value = event.target.checked;
        }
        else {
            value = event.target.value;
        }
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: value
            }
        }))

        this.props.updateConfSpec(
            this.props.role,
            {name: event.target.name, value: value}
            )

    }

    render() {
        return (
            <div className="confSpecWrapper">
                <div className="column">
                    <div>
                        <div className="inputDiv">
                            key
                            <input
                                type="text"
                                name="key"
                                className="customInput"
                                required
                                value={this.state.key}
                                onChange={this.onInputChange}
                                list="key-input-list"
                            />
                        </div>
                        <datalist id="key-input-list">
                            {
                                Constants.KEY_DATALIST.map(
                                    option => {
                                        return <option key={`${option} ${this.props.role}`}>{option}</option>
                                    }
                                )
                            }
                        </datalist>
                        <div className="inputDiv">
                            type
                            <select name="type" className="customInput" required
                                    defaultValue="" onChange={this.onSelectChange}>
                                <option value="" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                                {
                                    Constants.TYPE_OPTIONS.map(
                                        option => {
                                            return <option key={option}>{option}</option>
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div className="inputDiv">
                            label
                            <input type="text" name="label" className="customInput"
                                   required  value={this.state.label}
                                   onChange={this.onInputChange}/>
                        </div>
                    </div>
                </div>

                {  this.state.showOptions
                    ?
                    <Options
                        conf_spec_id={this.props.role}
                        options={this.props.syncConfSpecItem.options}
                    />
                    : null
                }

                <div className="column">
                    <div>
                        <div className="inputDiv">
                            tooltip
                            <input type="text" name="tooltip" className="customInput"
                                   value={this.state.tooltip} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputDiv">
                            subtype
                            <input type="text" name="subtype" className="customInput"
                                   value={this.state.subtype} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputDiv">
                            group
                            <input type="text" name="group" className="customInput"
                                   value={this.state.group} onChange={this.onInputChange}/>
                        </div>
                        <div className="checkboxDiv">
                            required
                            <input type="checkbox" name="required"
                                   value={this.state.required} onChange={this.onInputChange}/>
                        </div>
                    </div>
                </div>
                    <svg className="closeIcon" onClick={this.onDeleteIconClick}>
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>
            </div>
        )
    }
}


const mapDispatchToProps = {
    addOptions,
    deleteAllOptions,
    deleteConfSpec,
    updateConfSpec
}

const mapStateToProps = state => {
    return {
        syncConfSpec: state.configuration_spec
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationSpecItem);
