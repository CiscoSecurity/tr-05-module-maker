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
            if (this.props.syncProperties["supported-apis"].filter(
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
                       checked={this.props.syncProperties["supported-apis"].includes(this.state.title)}
                />
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

const mapStateToProps = (state) => ({
      syncProperties: state.properties
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportedAPI);
