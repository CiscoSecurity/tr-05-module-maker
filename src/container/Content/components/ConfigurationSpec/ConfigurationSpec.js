import React from "react";
import "./ConfigurationSpec.scss"
import ConfigurationSpecItem from "./components/ConfigurationSpecItem"
import { addConfSpec } from "redux/actions";
import { connect } from "react-redux";

class ConfigurationSpec extends React.Component {
    render() {
        return (
            <div>
                <div className="confSpecRow">
                    <div>
                    Configuration Spec
                    <button onClick={this.props.addConfSpec}>
                        Add new
                    </button>
                    </div>
                </div>
                {
                    this.props.syncConfSpec.map(
                    () => (<ConfigurationSpecItem />)
                    )
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    addConfSpec,
}

const mapStateToProps = state => {
    return {
        syncConfSpec: state.json.configuration_spec
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationSpec);
