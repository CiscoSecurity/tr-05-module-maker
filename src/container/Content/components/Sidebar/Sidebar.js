import React from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import {v, VALIDATION_SCHEMA} from "globals/constants/schema";
import { readStateFromBackend } from "rootActions";


class Sidebar extends React.Component {
    state = {
        showModal: false
    }


    constructValidJSON() {
        const data = JSON.parse(JSON.stringify(this.props.syncJSON));
        for (const elem of data.configuration_spec) {
            if (elem.options) {
                elem.options.map(
                    option => delete option["id"]
                )
            }
            delete elem["id"]
        }
        data.external_references.map(
            element => delete element["id"]
        )
        return data
    }

    isValidForm() {
        const form = document.getElementById("mainForm");
        return form.reportValidity();
    }

    onSaveButtonClick = () => {
        if (this.isValidForm()) {
            const formattedData = this.constructValidJSON();
            const fileData = JSON.stringify(formattedData);
            const blob = new Blob([fileData], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `${formattedData.title}_module_type.json`;
            link.href = url;
            link.click();
        }
        else {
            alert(Constants.FILL_REQUIRED_ALERT)
        }
    }

    onPushButtonClick = () => {
        if (this.isValidForm()) {
            this.setState({showModal: true});
        }
        else {
            alert(Constants.FILL_REQUIRED_ALERT)
        }
    }

    onCloseModalClick = () => {
        this.setState({showModal: false});
    }

    handleFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const json = JSON.parse(reader.result);
                const valResult = v.validate(json, VALIDATION_SCHEMA)
                if (!valResult.valid) {
                    alert(Constants.VALIDATION_ERROR_MESSAGE + valResult.errors.join(", "))
                } else {
                    this.props.readStateFromBackend(json)
                }
            };
            reader.onerror = () => {
                alert(Constants.FILE_LOADING_FAILURE + file.name)
            };
            reader.readAsText(file, 'UTF-8');
        }
    }

    onOpenButtonClick = () => {
        let inputElement = document.getElementById('JSONfile');
        inputElement.click();
        inputElement.addEventListener('change', this.handleFile, false);
    }



    render() {
        return (
            <div className="Sidebar">
                <p>{ Constants.SIDEBAR_TITLE }</p>
                <ul>
                    <input type="file" id="JSONfile" accept="application/JSON"/>
                    <li onClick={this.onOpenButtonClick}>
                        { Constants.OPEN_FROM_FILE }
                    </li>
                    <li>
                        { Constants.OPEN_FROM_API }
                    </li>
                    <li onClick={this.onSaveButtonClick}>
                        { Constants.SAVE_JSON }
                    </li>
                    <li onClick={this.onPushButtonClick}>
                        { Constants.PUSH_JSON }
                    </li>
                </ul>
                {
                   this.state.showModal &&
                   <Modal
                       json={this.constructValidJSON()}
                       closeModalHandler={this.onCloseModalClick}
                   />
                }
            </div>
        )
    }
}

const formatState = (state) => {
    const {
        external_references,
        configuration_spec,
        properties,
        capabilities,
        other_inputs
    } = state;
    return {
        external_references,
        configuration_spec,
        properties,
        capabilities,
        ...other_inputs
    }
};


const mapStateToProps = (state) => ({
        syncJSON: formatState(state)
})

const mapDispatchToProps = {
    readStateFromBackend
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

