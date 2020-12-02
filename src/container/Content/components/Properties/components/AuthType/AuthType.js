import React from "react";
import "./AuthType.scss";
import * as Constants from "globals/constants/constants";
import { toggleAuthType, updateAuthType } from "../../propertiesActions";
import { connect } from "react-redux";
import ConfToken from "./ConfToken";


class AuthType extends React.Component {
    onCheckboxToggle = () => {
        this.props.toggleAuthType();
    }

    onAuthSelection = event => {
       event.persist();
       this.props.updateAuthType(event.target.value)
    }

render() {
    return (
      <div>
        <div className="divAuth">

            <input type="checkbox"
                   autoComplete="off"
                   onChange={this.onCheckboxToggle}
                   checked={Object.keys(this.props.syncProperties).includes("auth-type")}
            />

            <label> { Constants.AUTH_LABEL } </label>
            <select className="selectAuth"
                    value={this.props.syncProperties["auth-type"] || ""}
                    onChange={this.onAuthSelection}
                    disabled={!Object.keys(this.props.syncProperties).includes("auth-type")}
                    required={Object.keys(this.props.syncProperties).includes("auth-type")&&"required"}

            >
                <option value="" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                {
                   Constants.AUTH_TYPE_OPTIONS.map(
                        option => {
                            return <option value={option} key={option}>{option}</option>
                        }
                    )
                }
            </select>
        </div>
            {
                Object.keys(this.props.syncProperties).includes("auth-type")
                && this.props.syncProperties["auth-type"] === Constants.CONFIGURATION_TOKEN
                    ? <ConfToken/>
                    : ""
            }
      </div>
    )
}
}

const mapDispatchToProps = {
    toggleAuthType,
    updateAuthType
}

const mapStateToProps = (state) => ({
    syncProperties: state.properties
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthType);
