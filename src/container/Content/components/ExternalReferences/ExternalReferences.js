import React from "react";
import CustomInput from "./components/CustomInput/CustomInput";
import * as Constants from "globals/constants/constants";
import "container/Content/components/ExternalReferences/ExternalReferences.scss"
import { connect } from "react-redux";
import { addExternalReference } from "./externalReferencesActions";


class ExternalReferences extends React.Component {

    onAddButtonClick = () => {
        this.props.addExternalReference()
    }

    render() {
        return (
            <div className="reference-section">
                <div>
                    <label className='input-label'> {Constants.SECTION_TITLE}</label>
                    <button onClick={this.onAddButtonClick} type="button">
                        {Constants.ADD_BTN_TITLE}
                    </button>
                </div>
                    {
                        this.props.syncExternalReferences.map(
                            item => (<CustomInput reference={item} key={item.id}/>)
                        )
                    }
            </div>
        )
    }
}


const mapDispatchToProps = {
    addExternalReference
}

const mapStateToProps = (state) => ({
        syncExternalReferences: state.external_references
})

export default connect(mapStateToProps, mapDispatchToProps)(ExternalReferences);
