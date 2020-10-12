import React from "react";
import "./SupportedAPI.scss";
import { connect } from "react-redux";
import { updateSupportedAPI } from "../../propertiesActions";
import { addCapability, deleteCapability }
from "container/Content/components/Capabilities/capabilitiesActions";


class SupportedAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.api.title,
            class: this.props.api.class
        }
    }

    onCheckboxToggle = (event) => {

        this.props.updateSupportedAPI(this.state.title);

        if (event.target.checked) {
            this.props.addCapability(this.state.class);
        }

        else {
            if (this.props.syncProperties["supported-apis"].filter(
                elem => elem.startsWith(this.state.class)).length === 1) {
                this.props.deleteCapability(this.state.class);
            }
          }
        }

    render() {
        return (
            <div className="supportedAPI">
                <input type="checkbox" autoComplete="off" onChange={this.onCheckboxToggle}/>
                {this.state.title}
            </div>
        )
    }
}

const mapDispatchToProps = {
    addCapability,
    deleteCapability,
    updateSupportedAPI
}

const mapStateToProps = state => {
    return {
        syncProperties: state.properties
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportedAPI);
