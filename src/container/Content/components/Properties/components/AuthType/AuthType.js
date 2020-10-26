import React from "react";
import "./AuthType.scss";
import * as Constants from "globals/constants/constants";
import { toggleAuthType, updateAuthType } from "../../propertiesActions";
import { connect } from "react-redux";


class AuthType extends React.Component {
   state = {
            auth_type_options: ["authorization-header", "basic", "bearer"],
        }


    onCheckboxToggle = () => {
        this.props.toggleAuthType();
    }

    onAuthSelection = event => {
       event.persist();
       this.props.updateAuthType(event.target.value)
    }

render() {
    return (
        <div className="divAuth">

            <input type="checkbox"
                   autoComplete="off"
                   onClick={this.onCheckboxToggle}
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
                   this.state.auth_type_options.map(
                        option => {
                            return <option value={option} key={option}>{option}</option>
                        }
                    )
                }
            </select>
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
