import React from "react";
import styles from "./ConfigurationSpec.module.scss";

export default class Options extends React.Component {
    render() {
        return (
            <fieldset>
                <div className={styles.closeIcon}>x</div>
                <div className={styles.inputDiv}>
                    value
                    <input type="text" name="option" className={styles.customInput}/>
                </div>
                <div className={styles.inputDiv}>
                    label
                    <input type="text" name="option" className={styles.customInput}/>
                </div>
            </fieldset>
        )
    }
}
