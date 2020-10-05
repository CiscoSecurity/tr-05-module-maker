import React from "react";
import styles from "./ConfigurationSpec.module.scss";
import Icons from "../../../../globals/icons/sprite.svg";


export default class Options extends React.Component {
    render() {
        return (
            <div className={styles.optionsWrapper}>
                <div className={styles.optionsIconWrapper}>
                    <svg className={styles.closeIcon}>
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>
                </div>
                <div className={styles.inputDiv}>
                    value
                    <input type="text" name="option" className={styles.customInput}/>
                </div>
                <div className={styles.inputDiv}>
                    label
                    <input type="text" name="option" className={styles.customInput}/>
                </div>
            </div>
        )
    }
}
