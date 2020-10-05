import React from "react";
import { connect } from "react-redux";
import Capability from "./Capability";
import * as Constants from "../../../../globals/constants/constants";


const Capabilities = ({syncCapabilities}) => {
            return (
                <div>
                    <p>Capabilities</p>
                    <fieldset>
                        <p>{Constants.CAPABILITIES_TEXT}</p>
                        {syncCapabilities.map(api => {
                            return <Capability api={api} key={api.id}/>
                        })}
                    </fieldset>
                </div>
            )
        }

const mapStateToProps = state => {
    return {
        syncCapabilities: state.json.capabilities
    }
}


export default connect(mapStateToProps, null)(Capabilities);
