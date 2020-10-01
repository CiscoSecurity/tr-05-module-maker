import React from "react";
import styles from "./Capabilities.module.scss"

export default function Capability ({ api }){
    return <div>
        <div className={styles.capabilitiesWrapper}>
            {api}
            <input
                type="text"
                className={styles.inputDescription}
                placeholder="Enter description"
                autoComplete="off"
            />
        </div>
    </div>;
}