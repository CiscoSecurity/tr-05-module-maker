import "./CustomInput.scss";
import React from "react";
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Icons from "globals/icons/sprite.svg";
import { deleteExternalReference, updateExternalReference }
from "container/Content/components/ExternalReferences/externalReferencesActions";


class CustomInput extends React.Component {
    state = {
            "label": "",
            "link": ""
        }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value
            }
        }))
        this.props.updateExternalReference(
            this.props.id,
            {
            name: event.target.name,
            value: event.target.value.trim()
            }
            )
    }

    onDeleteIconClick = () => {
        this.props.deleteExternalReference(this.props.id);
    }

    render() {
        return(
            <div className="reference_wrapper">
                <input type="text"
                       name="label"
                       placeholder="Enter label"
                       className="custom_input"
                       autoComplete="off"
                       list="ext-ref"
                       value={this.state.label}
                       onChange={this.changeInputHandler}
                       required
                />
                <input type="text"
                       name="link"
                       placeholder="Enter link"
                       className="custom_input"
                       autoComplete="off"
                       value={this.state.link}
                       onChange={this.changeInputHandler}
                       required
                />
                <datalist id="ext-ref">
                    {
                        Constants.LABELS.map(
                            option => {
                                return (
                                    <option key={`${option} ${this.props.id}`}>
                                        {option}
                                    </option>
                                )
                            }
                        )
                    }
                </datalist>
                <svg className="closeIcon" onClick={this.onDeleteIconClick}>
                    <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                </svg>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        syncReferences: state.external_references
})

const mapDispatchToProps = {
    deleteExternalReference,
    updateExternalReference
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomInput);
