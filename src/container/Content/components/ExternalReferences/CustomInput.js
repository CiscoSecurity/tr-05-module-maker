import styles from "./ExternalReferences.module.scss";
import React from "react";

export default class CustomInput extends React.Component {
    render() {
        return(
            <div className={styles.reference_wrapper}>
                <input type="text" placeholder="Enter label" className={styles.custom_input}
                       autoComplete="off"/>
                <input type="text" placeholder="Enter link" className={styles.custom_input}
                       autoComplete="off"/>
            </div>
        )
    }
}
