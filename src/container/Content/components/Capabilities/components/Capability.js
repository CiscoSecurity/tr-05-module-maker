import React from "react";
import "./Capability.scss"
import { updateCapabilityDescription } from "redux/actions";
import { connect } from "react-redux";


class Capability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onDescriptionChange = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name] : event.target.value
            }}))
        this.props.updateCapabilityDescription({
            id: this.props.api.id, description: event.target.value.trim()
        }
        )
    }

    render() {
        return (
            <div className="capabilitiesWrapper">
                <p>{this.props.api.id}</p>
                <input
                    type="text"
                    value={this.state.description}
                    name={this.props.api.id}
                    placeholder="Enter description"
                    autoComplete="off"
                    onChange={this.onDescriptionChange}
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