import React from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    constructValidJSON(data){
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

    onSaveButtonClick = () => {
/*        const form = document.getElementsByTagName('form')[0];
        const valid = form.reportValidity();
        if (valid) {*/

            const data = JSON.parse(JSON.stringify(this.props.syncJSON));
            const formattedData = this.constructValidJSON(data);
            const fileData = JSON.stringify(formattedData);
            const blob = new Blob([fileData], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${data.title}_module_type.json`;
            link.href = url;
            link.click();
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
                    <li>
                        { Constants.PUSH_JSON }
                    </li>
                </ul>
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
