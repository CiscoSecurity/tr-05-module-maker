import React from "react";
import styles from "./Sidebar.module.scss"
import * as Constants from "../../../../globals/constants";
import {connect, useStore} from "react-redux";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    save = () => {
        let data = this.props.syncJSON; // is it ok ?
        let fileData = JSON.stringify(data);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${data.title}_module_type.json`;
        link.href = url;
        link.click();
    }

    render() {
        return <div className={styles.Sidebar}>
            <p className={styles.sidebarHeader}>
                Settings</p>
            <ul className={styles.list}>
                <input type="file" className={styles.hiddenInput} accept="application/JSON"/>
                <li className={styles.sidebarItem}>
                    Open JSON from File
                </li>
                <li className={styles.sidebarItem}>
                    Open JSON from TR API
                </li>
                <li className={styles.sidebarItem} onClick={this.save}>
                    Save JSON
                </li>
                <li className={styles.sidebarItem}>
                    Push JSON to TR
                </li>
            </ul>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        syncJSON: state.json
    }
}

export default connect(mapStateToProps, null)(Sidebar);