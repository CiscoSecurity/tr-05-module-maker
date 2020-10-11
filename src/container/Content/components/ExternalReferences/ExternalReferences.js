import React from "react";
import CustomInput from "./components/CustomInput/CustomInput";
import * as Constants from "globals/constants/constants";
import "container/Content/components/ExternalReferences/ExternalReferences.scss"
import { connect } from "react-redux";
import { addExternalReference } from "redux/actions";


class ExternalReferences extends React.Component {

    onAddButtonClick = event => {
        this.props.addExternalReference()
    }

    render() {
        return (
            <div>
                <div>
                <p> {Constants.SECTION_TITLE}
                    <button onClick={this.onAddButtonClick} type="button">+ Add</button>
                </p>
                </div>
                    {
                        this.props.syncExternalReferences.map(
                            item => (<CustomInput id={item.id} key={item.id}/>)
                        )
                    }
            </div>
        )
    }
}


const mapDispatchToProps = {
    addExternalReference
}

const mapStateToProps = state => {
    return {
        syncExternalReferences: state.external_references
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalReferences);
