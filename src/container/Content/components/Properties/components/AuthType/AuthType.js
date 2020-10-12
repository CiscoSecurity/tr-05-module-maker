import React from "react";
import "./AuthType.scss";
import * as Constants from "globals/constants/constants";
import { toggleAuthType, updateAuthType } from "../../propertiesActions";
import { connect } from "react-redux";


class AuthType extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            auth_type_options: ["authorization-header", "basic", "bearer"],
            selected_value: ""
        }
    }


    onCheckboxToggle = event => {
        this.props.toggleAuthType();
        if (!event.target.checked) {
            this.setState(prev => ({
                ...prev, ...{
                    selected_value: ""
                }
            }))
        }
    }
    onAuthSelection = event => {
        event.persist()
       this.setState(prev => ({
            ...prev, ...{
                selected_value: event.target.value
            }
        }))
      this.props.updateAuthType(event.target.value)
    }

render() {
    return (
        <div className="divAuth">

            <input type="checkbox"
                   autoComplete="off"
                   onClick={this.onCheckboxToggle}
            />

            <label>authorization</label>
            <select className="selectAuth"
                    value={this.state.selected_value}
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

const mapStateToProps = state => {
    return {
        syncProperties: state.properties
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthType);
