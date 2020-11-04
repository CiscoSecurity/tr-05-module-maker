import React from "react";
import "./ConfigurationSpecItem.scss"
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";
import Options from "../Options/Options";
import { connect } from "react-redux";
import { addOptions, deleteAllOptions, deleteConfSpec, updateConfSpec }
from "../../configurationSpecActions";


class ConfigurationSpecItem extends React.Component {
    state = {
        showOptions: this.props.syncConfSpecItem.options.length > 0
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
                            {Constants.KEY_LABEL}
                            <span className="requiredField">*</span>
                            <input
                                type="text"
                                name="key"
                                className="customInput"
                                required
                                value={this.props.syncConfSpecItem.key}
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
                            {Constants.TYPE_LABEL}
                            <span className="requiredField">*</span>
                            <select name="type"
                                    className="customInput"
                                    required
                                    value={this.props.syncConfSpecItem.type || ''}
                                    onChange={this.onSelectChange}>
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
                            {Constants.LABEL}
                            <span className="requiredField">*</span>
                            <input type="text" name="label" className="customInput"
                                   required  value={this.props.syncConfSpecItem.label}
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
                            {Constants.TOOLTIP_LABEL}
                            <input type="text" name="tooltip" className="customInput"
                                   value={this.props.syncConfSpecItem.tooltip} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputDiv">
                            {Constants.SUBTYPE_LABEL}
                            <input type="text" name="subtype" className="customInput"
                                   value={this.props.syncConfSpecItem.subtype} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputDiv">
                            {Constants.GROUP_LABEL}
                            <input type="text" name="group" className="customInput"
                                   value={this.props.syncConfSpecItem['group']} onChange={this.onInputChange}/>
                        </div>
                        <div className="checkboxDiv">
                            {Constants.REQUIRED_LABEL}
                            <input type="checkbox" name="required"
                                   checked={this.props.syncConfSpecItem.required} onChange={this.onInputChange}/>
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

const mapStateToProps = (state) => ({
        syncConfSpec: state.configuration_spec
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationSpecItem);
