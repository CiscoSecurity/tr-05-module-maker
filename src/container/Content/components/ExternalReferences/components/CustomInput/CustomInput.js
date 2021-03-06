import "./CustomInput.scss";
import React from "react";
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Icons from "globals/icons/sprite.svg";
import { deleteExternalReference, updateExternalReference }
from "container/Content/components/ExternalReferences/externalReferencesActions";


class CustomInput extends React.Component {
    trimInputValue = event => {
        this.props.updateExternalReference(
            this.props.reference.id,
            {
                name: event.target.name,
                value: event.target.value.trim()
            })
    }

    changeInputHandler = event => {
        event.persist()
        this.props.updateExternalReference(
            this.props.reference.id,
            {
            name: event.target.name,
            value: event.target.value
            }
            )
    }

    onDeleteIconClick = () => {
        this.props.deleteExternalReference(this.props.reference.id);
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
                       value={this.props.reference.label}
                       onChange={this.changeInputHandler}
                       onBlur={this.trimInputValue}
                       required
                />
                <input type="text"
                       name="link"
                       placeholder="Enter link"
                       className="custom_input"
                       autoComplete="off"
                       value={this.props.reference.link}
                       onChange={this.changeInputHandler}
                       onBlur={this.trimInputValue}
                       required
                />
                <datalist id="ext-ref">
                    {
                        Constants.LABELS.map(
                            option => {
                                return (
                                    <option key={`${option} ${this.props.reference.id}`}>
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


const mapDispatchToProps = {
    deleteExternalReference,
    updateExternalReference
}

export default connect(null, mapDispatchToProps)(CustomInput);
