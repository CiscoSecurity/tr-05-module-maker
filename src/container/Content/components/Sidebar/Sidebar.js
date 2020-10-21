import React from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";


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

    onPushButtonClick = (e) => {
        e.persist()
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
                {
                   this.state.showModal &&
                   <Modal
                       json={this.constructValidJSON()}
                       handler={this.onCloseModalClick}
                   />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        syncJSON: state
})

export default connect(mapStateToProps)(Sidebar);

