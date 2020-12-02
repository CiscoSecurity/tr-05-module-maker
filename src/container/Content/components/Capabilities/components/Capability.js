import React from "react";
import "./Capability.scss"
import { updateCapabilityDescription } from "../capabilitiesActions";
import { connect } from "react-redux";


class Capability extends React.Component {
    trimInputValue = event => {
        this.props.updateCapabilityDescription({
            id: this.props.api.id, description: event.target.value.trim()
        })
    }

    onDescriptionChange = event => {
        event.persist()
        this.props.updateCapabilityDescription({
            id: this.props.api.id, description: event.target.value
        }
        )
    }

    render() {
        return (
            <div className="capabilitiesWrapper">
                <p>{this.props.api.id}
                    <span className="required-field">*</span>
                </p>
                <input
                    type="text"
                    value={this.props.api.description || ""}
                    name={this.props.api.id}
                    placeholder="Enter description"
                    autoComplete="off"
                    onChange={this.onDescriptionChange}
                    onBlur={this.trimInputValue}
                    required
                />
            </div>
        )
    }
}


const mapDispatchToProps = {
    updateCapabilityDescription
}

export default connect(null, mapDispatchToProps)(Capability);
