import React, { createRef } from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import { CustomAlert} from "../CustomAlert/CustomAlert";
import { validator, VALIDATION_SCHEMA } from "globals/constants/schema";
import { readStateFromBackend } from "rootActions";


class Sidebar extends React.Component {
    state = {
        showModal: false,
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
            this.setState({showModal: true});
        }
    }

    onCloseModalClick = () => {
        this.setState({showModal: false});
    }

    onCloseAlertClick = () => {
        this.setState({showAlert: false});
    }

    throwAlert = (title, message) => {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertTitle: title
        })
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
                        this.throwAlert(
                            Constants.ALERT_TITLE_FAILURE,
                            Constants.VALIDATION_ERROR_MESSAGE
                            + valResult.errors.join(", ")
                        )
                    } else {
                        this.props.readStateFromBackend(json)
                    }
                }
                catch (error) {
                    this.throwAlert(
                        Constants.ALERT_TITLE_FAILURE,
                        String(error)
                    )
                }
            };
            reader.onerror = () => {
                this.throwAlert(
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
                       alertHandler={this.throwAlert}
                   />
                }
                {
                    this.state.showAlert &&
                        <CustomAlert
                            title={this.state.alertTitle}
                            message={this.state.alertMessage}
                            closeAlertHandler={this.onCloseAlertClick}
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

