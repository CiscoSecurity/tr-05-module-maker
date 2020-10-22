import React from "react";
import "./ConfigurationSpec.scss"
import ConfigurationSpecItem from "./components/ConfigurationSpecItem/ConfigurationSpecItem"
import { addConfSpec } from "./configurationSpecActions";
import { connect } from "react-redux";
import * as Constants from "globals/constants/constants";

class ConfigurationSpec extends React.Component {
    render() {
        return (
            <div>
                <div className="confSpecRow">
                    <div>
                    Configuration Spec
                    <button onClick={this.props.addConfSpec}>
                        { Constants.ADD_BTN_TITLE }
                    </button>
                    </div>
                </div>
                {
                    this.props.syncConfSpec.map(
                        elem => (
                            <ConfigurationSpecItem
                                role={elem.id}
                                key={elem.id}
                                syncConfSpecItem={elem}
                            />
                            )
                    )
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    addConfSpec,
}

const mapStateToProps = (state) => ({
        syncConfSpec: state.configuration_spec
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationSpec);
