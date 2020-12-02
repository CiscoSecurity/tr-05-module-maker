import React from "react";
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import { toggleAlgorithm, updateConfToken } from "../../propertiesActions";
import ConfTokenDetail from "./ConfTokenDetail";
import "./ConfToken.scss";


class ConfToken extends React.Component {
    changeInputHandler = event => {
        event.persist()
        this.props.updateConfToken({
            name: event.target.name, value: event.target.value
        })
    }

    onSelectUpdate = event => {
        this.changeInputHandler(event);
        this.props.toggleAlgorithm(event.target.value)
    }

    render() {
        return (
            <div>
                <div className='conf-token-input'>
                    <label>{Constants.CONFIGURATION_TOKEN_ALG}</label>
                    <select value={this.props.syncProperties[Constants.CONFIGURATION_TOKEN_ALG] || ""}
                            name={Constants.CONFIGURATION_TOKEN_ALG}
                            onChange={this.onSelectUpdate}
                    >
                        <option value="" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                        {
                            Constants.CONF_TOKEN_OPTIONS.map(
                                option => {
                                    return <option value={option} key={option}>{option}</option>
                                }
                            )
                        }
                    </select>
                </div>
                {
                    this.props.syncProperties[Constants.CONFIGURATION_TOKEN_ALG]
                        ? <ConfTokenDetail  alg={this.props.syncProperties[Constants.CONFIGURATION_TOKEN_ALG]}/>
                        : ''
                }
                <div className='conf-token-input'>
                    <label>{Constants.CONFIGURATION_TOKEN_AUDIENCE}</label>
                    <input value={this.props.syncProperties[Constants.CONFIGURATION_TOKEN_AUDIENCE] || ""}
                           name={Constants.CONFIGURATION_TOKEN_AUDIENCE}
                           onChange={this.changeInputHandler}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateConfToken,
    toggleAlgorithm
}

const mapStateToProps = (state) => ({
    syncProperties: state.properties
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfToken);
