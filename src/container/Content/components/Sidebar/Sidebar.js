import React from "react";
import "./Sidebar.scss"
import * as Constants from "globals/constants/constants";
import { connect } from "react-redux";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    onSaveButtonClick = () => {
        const data = this.props.syncJSON;
        const fileData = JSON.stringify(data);
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
