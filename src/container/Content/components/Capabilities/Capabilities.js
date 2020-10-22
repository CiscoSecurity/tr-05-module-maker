import React from "react";
import { connect } from "react-redux";
import Capability from "./components/Capability";
import * as Constants from "globals/constants/constants";
import "./Capabilities.scss"


const Capabilities = ({syncCapabilities}) => {
            return (
                <div>
                    <p>Capabilities</p>
                    <fieldset>
                        <p className="capabilitiesTip">{Constants.CAPABILITIES_TEXT}</p>
                        {syncCapabilities.map(api => {
                            return <Capability api={api} key={api.id}/>
                        })}
                    </fieldset>
                </div>
            )
        }

const mapStateToProps = (state) => ({
        syncCapabilities: state.capabilities
})

export default connect(mapStateToProps, null)(Capabilities);
