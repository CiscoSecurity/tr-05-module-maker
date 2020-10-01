import React from "react";
import styles from "./ConfigurationSpec.module.scss"
import ConfigurationSpecItem from "./ConfigurationSpecItem"

class ConfigurationSpec extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.row}>
                    <div>
                    Configuration Spec
                    <button className={styles.addNewButton}> Add new </button>
                    </div>
                </div>
                <ConfigurationSpecItem />
            </div>
        )
    }
}

export default ConfigurationSpec;