import React from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
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
            alert("Please, fill out highlighted fields")
        }
    }

    onPushButtonClick = () => {
        if (this.isValidForm()) {
            const modal = document.getElementById("modal");
            modal.style.display = "block";
        }
        else {
            alert("Please, fill out highlighted fields")
        }
    }

    render() {
        return (
            <div className="Sidebar">
                <p>{ Constants.SIDEBAR_TITLE }</p>
                <ul>
                    <input type="file" accept="application/JSON"/>
                    <li>
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
                <Modal json={this.constructValidJSON()}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        syncJSON: state
    }
}

export default connect(mapStateToProps, null)(Sidebar);

