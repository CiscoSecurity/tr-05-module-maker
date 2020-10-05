import React from "react";
import styles from "./Sidebar.module.scss"
import * as Constants from "../../../../globals/constants/constants";
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
            <div className={styles.Sidebar}>
                <p className={styles.sidebarHeader}>{Constants.SIDEBAR_TITLE}</p>
                <ul className={styles.list}>
                    <input type="file" className={styles.hiddenInput} accept="application/JSON"/>
                    <li className={styles.sidebarItem}>
                        {Constants.OPEN_FROM_FILE}
                    </li>
                    <li className={styles.sidebarItem}>
                        {Constants.OPEN_FROM_API}
                    </li>
                    <li className={styles.sidebarItem} onClick={this.onSaveButtonClick}>
                        {Constants.SAVE_JSON}
                    </li>
                    <li className={styles.sidebarItem}>
                        {Constants.PUSH_JSON}
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        syncJSON: state.json
    }
}

export default connect(mapStateToProps, null)(Sidebar);
