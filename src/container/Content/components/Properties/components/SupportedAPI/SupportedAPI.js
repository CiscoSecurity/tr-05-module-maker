import React from "react";
import "./SupportedAPI.scss";
import { connect } from "react-redux";
import { updateSupportedAPI } from "../../propertiesActions";
import { addCapability, deleteCapability }
from "container/Content/components/Capabilities/capabilitiesActions";


class SupportedAPI extends React.Component {
    state = {
            title: this.props.api.title,
            class: this.props.api.class
        }

    onCheckboxToggle = (event) => {

        this.props.updateSupportedAPI(this.state.title);

        if (event.target.checked) {
            this.props.addCapability(this.state.class);
        }

        else {
            if (this.props.syncSupportedAPIs.filter(
                elem => elem.startsWith(this.state.class)).length === 1) {
                this.props.deleteCapability(this.state.class);
            }
          }
        }

    render() {
        return (
            <div className="supportedAPI">
                <input type="checkbox"
                       autoComplete="off"
                       onChange={this.onCheckboxToggle}
                       checked={this.props.syncSupportedAPIs.includes(this.state.title)}
                />
                <label>{this.state.title}</label>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addCapability,
    deleteCapability,
    updateSupportedAPI
}

const mapStateToProps = (state) => ({
      syncSupportedAPIs: state.properties["supported-apis"] || []
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportedAPI);
