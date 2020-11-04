import React, { createRef } from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import { VALIDATION_SCHEMA, validator } from "globals/constants/schema";
import { readStateFromBackend } from "rootActions";
import ModalForPull from "../ModalForPull/ModalForPull";
import {
    hideAlert, hideModal, hideModalForPull,
    showAlert, showModal, showModalForPull
} from "../visibilityActions";


class Sidebar extends React.Component {
    state = {
        showAlert: false,
        alertMessage: "",
        alertTitle: "",
        inputEl: createRef()
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
    }

    onPushButtonClick = () => {
        if (this.isValidForm()) {
            this.props.showModal();
        }
    }

    handleFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const json = JSON.parse(reader.result);
                    const valResult = validator.validate(json, VALIDATION_SCHEMA)
                    if (!valResult.valid) {
                        this.props.showAlert(
                            Constants.ALERT_TITLE_FAILURE,
                            Constants.VALIDATION_ERROR_MESSAGE
                            + valResult.errors.join(", ")
                        )
                    } else {
                        this.props.readStateFromBackend(json)
                    }
                }
                catch (error) {
                    this.props.showAlert(
                        Constants.ALERT_TITLE_FAILURE,
                        String(error)
                    )
                }
            };
            reader.onerror = () => {
                this.props.showAlert(
                    Constants.ALERT_TITLE_FAILURE,
                    Constants.FILE_LOADING_FAILURE
                    + file.name
                );
            };
            reader.readAsText(file, 'UTF-8');
        }
    }

    onOpenButtonClick = () => {
        const inputElement = this.state.inputEl.current;
        inputElement.click();
        inputElement.addEventListener('change', this.handleFile, false);
    }


    render() {
        return (
            <div className="Sidebar">
                <p>{ Constants.SIDEBAR_TITLE }</p>
                <ul>
                    <input type="file" ref={this.state.inputEl} accept="application/JSON"/>
                    <li onClick={this.onOpenButtonClick}>
                        { Constants.OPEN_FROM_FILE }
                    </li>
                    <li onClick={this.props.showModalForPull}>
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
                   this.props.modalVisible &&
                   <Modal
                       json={this.constructValidJSON()}
                   />
                }
                {
                    this.props.customAlert &&
                        <CustomAlert
                            title={this.props.customAlert.title}
                            message={this.props.customAlert.message}
                            closeAlertHandler={this.props.hideAlert}
                        />
                }
                {
                    this.props.modalForPull &&
                    <ModalForPull/>
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
    syncJSON: formatState(state),
    modalVisible: state.elements_visibility.modal,
    modalForPull: state.elements_visibility.modalForPull,
    customAlert: state.elements_visibility.customAlert
})

const mapDispatchToProps = {
    readStateFromBackend,
    showModal,
    hideModal,
    showModalForPull,
    hideModalForPull,
    showAlert,
    hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

