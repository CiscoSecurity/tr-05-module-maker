import React from "react";
import styles from "./Capabilities.module.scss"
import {updateCapabilityDescription} from "../../../../redux/actions";
import {connect} from "react-redux";


class Capability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    changeDescriptionHandler = event => {
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
            <div className={styles.capabilitiesWrapper}>
                {this.props.api.id}
                <input
                    type="text"
                    value={this.state.description}
                    name={this.props.api.id}
                    className={styles.inputDescription}
                    placeholder="Enter description"
                    autoComplete="off"
                    onChange={this.changeDescriptionHandler}
                />
            </div>
        )
    }

}

const mapDispatchToProps = {
    updateCapabilityDescription
}

export default connect(null, mapDispatchToProps)(Capability);