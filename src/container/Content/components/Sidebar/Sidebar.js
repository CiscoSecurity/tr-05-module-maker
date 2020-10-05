import React from "react";
import styles from "./Sidebar.module.scss"
import * as Constants from "../../../../globals/constants/constants";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.Sidebar}>
            <p className={styles.sidebarHeader}>{Constants.SIDEBAR_TITLE}</p>
            <ul className={styles.list}>
                <input type="file" className={styles.hiddenInput} accept="application/JSON"/>
                <li className={styles.sidebarItem}>
                    {Constants.OPEN_FROM_FILE}
                </li>
                <li className={styles.sidebarItem}>
                    {Constants.OPEN_FROM_API}
                </li>
                <li className={styles.sidebarItem}>
                    {Constants.SAVE_JSON}
                </li>
                <li className={styles.sidebarItem}>
                    {Constants.PUSH_JSON}
                </li>
            </ul>
        </div>;
    }
}

export default Sidebar;
