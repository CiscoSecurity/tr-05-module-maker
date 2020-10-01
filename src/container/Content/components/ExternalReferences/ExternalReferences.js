import React from "react";
import styles from "./ExternalReferences.module.scss"


class ExternalReferences extends React.Component {
    render() {
        return <div>
            <p>External References</p>
            <fieldset>
                <div className={styles.reference_wrapper}>
                    <input type="checkbox" autoComplete="off"/>
                    Free Trial
                    <input  type="text" autoComplete="off" className={styles.predefined_input}/>
                </div>
                <div className={styles.reference_wrapper}>
                    <input type="checkbox" autoComplete="off"/>
                    Sign Up
                    <input type="text" autoComplete="off" className={styles.predefined_input}/>
                </div>
                <div className={styles.reference_wrapper}>
                    <input type="checkbox" id="ContactUs"
                           autoComplete="off"/>
                    Contact Us
                    <input type="text" id="ContactUsValue" className={styles.predefined_input}
                           name="Contact Us" autoComplete="off"/>
                </div>
                <div className={styles.reference_wrapper}>
                    <input type="text" placeholder="Enter label" className={styles.custom_input}
                           autoComplete="off"/>
                    <input type="text" placeholder="Enter link" className={styles.custom_input}
                           autoComplete="off"/>
                </div>
                <div className={styles.reference_wrapper}>
                    <input type="text" placeholder="Enter label" className={styles.custom_input}
                           autoComplete="off"/>
                    <input type="text" placeholder="Enter link" className={styles.custom_input}
                           autoComplete="off"/>
                </div>
            </fieldset>
        </div>;
    }
}

export default ExternalReferences;