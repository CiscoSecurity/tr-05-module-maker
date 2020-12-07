import React, { createRef } from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import ModalForPush from "../ModalForPush/ModalForPush";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import { validator, VALIDATION_SCHEMA } from "globals/constants/schema";
import { readStateFromBackend } from "rootActions";
import ModalForPull from "../ModalForPull/ModalForPull";
import {
    hideAlert, hideModalForPush, hideModalForPull,
    showAlert, showModalForPush, showModalForPull,
    showModalForPatch, showConfirmBox, hideConfirmBox, deactivatePatch
} from "../visibilityActions";
import { formatState } from "utils/formattingUtils"
import ModalForPatch from "../ModalForPatch/ModalForPatch";
import { constructValidJSON, savePatch } from "utils/saveUtils";
import { ConfirmBox } from "../ConfirmBox/ConfirmBox";


class Sidebar extends React.Component {
    state = {
        inputEl: createRef()
    }

    isValidForm() {
        const form = document.getElementById("mainForm");
        return form.reportValidity();
    }

    onSaveButtonClick = () => {
        if (this.isValidForm()) {
            const formattedData = constructValidJSON(this.props.syncJSON);
            const fileData = JSON.stringify(formattedData, null, 4);
            const blob = new Blob([fileData], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const title = formattedData.title.replace(/ /g, '_');
            link.download = `${title}_module_type.json`;
            link.href = url;
            link.click();
        }
    }

    onPushButtonClick = () => {
        if (this.isValidForm()) {
            this.props.showModalForPush();
        }
    }

    onCreatePatchClick = () => {
        if (this.props.isPatchActive){
            if (this.isValidForm()) {
                savePatch(
                    this.props.patchBase,
                    this.props.syncJSON,
                    this.props.deactivatePatch,
                    this.props.showAlert
                );
            }
        }
        else {
            this.props.showModalForPatch();
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
                    <li onClick={
                        this.props.isPatchActive
                            ?this.props.showConfirmBox
                            :this.onOpenButtonClick
                    }>
                        { Constants.OPEN_FROM_FILE }
                    </li>
                    <li onClick={
                        this.props.isPatchActive
                            ?this.props.showConfirmBox
                            :this.props.showModalForPull
                    }>
                        { Constants.OPEN_FROM_API }
                    </li>
                    <li onClick={
                        this.props.isPatchActive
                            ?this.props.showConfirmBox
                            :this.onSaveButtonClick
                    }>
                        { Constants.SAVE_JSON }
                    </li>
                    <li onClick={
                        this.props.isPatchActive
                            ?this.props.showConfirmBox
                            :this.onPushButtonClick
                    }>
                        { Constants.PUSH_JSON }
                    </li>
                    <li onClick={this.onCreatePatchClick}>
                        { this.props.isPatchActive
                            ?Constants.SAVE_PATCH_JSON
                            :Constants.CREATE_PATCH
                        }
                    </li>
                </ul>
                {
                   this.props.modalForPush &&
                   <ModalForPush
                       json={constructValidJSON(this.props.syncJSON)}
                   />
                }
                {
                    this.props.modalForPatch &&
                    <ModalForPatch/>
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
                {
                    this.props.confirmBox &&
                    <ConfirmBox message={Constants.CONFIRM_BOX_PATCH_TEXT}
                                title={Constants.CONFIRM_BOX_PATCH_TITLE}
                                closeClickHandler={this.props.hideConfirmBox}
                                okClickHandler={this.props.deactivatePatch}
                    />
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    syncJSON: formatState(state),
    patchBase: state.patch_base,
    modalForPush: state.elements_visibility.modalForPush,
    modalForPatch: state.elements_visibility.modalForPatch,
    modalForPull: state.elements_visibility.modalForPull,
    customAlert: state.elements_visibility.customAlert,
    confirmBox: state.elements_visibility.confirmBox,
    isPatchActive: state.elements_visibility.isPatchActive,
})

const mapDispatchToProps = {
    readStateFromBackend,
    showModalForPush,
    showModalForPatch,
    hideModalForPush,
    showModalForPull,
    hideModalForPull,
    showConfirmBox,
    hideConfirmBox,
    deactivatePatch,
    showAlert,
    hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

