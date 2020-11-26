import React from "react";
import { connect } from "react-redux";
import { updateConfToken } from "../../propertiesActions";


class ConfTokenDetail extends React.Component {
    changeInputHandler = event => {
        event.persist()
        this.props.updateConfToken({
            name: event.target.name, value: event.target.value
        })
    }

    render() {
        if (this.props.alg === 'RS256') {
            return (<div className='conf-token-input'>
                <label>custom-jwks-host</label>
                <input value={this.props.syncProperties['custom_jwks_host'] || ""}
                       name='custom_jwks_host'
                       onChange={this.changeInputHandler}
                />
            </div>)
        } else {
            return (
                <div className='conf-token-input'>
                    <label>configuration-token-key</label>
                    <input value={this.props.syncProperties['configuration-token-key'] || ""}
                           name='configuration-token-key'
                           onChange={this.changeInputHandler}
                    />
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    updateConfToken
}

const mapStateToProps = (state) => ({
    syncProperties: state.properties
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfTokenDetail);
