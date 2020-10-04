import React from "react";
import styles from "./ConfigurationSpec.module.scss"
import * as Constants from "../../../../globals/constants";
import Options from "./Options";


export default class ConfigurationSpecItem extends React.Component {

    render() {
        return (
            <div className={styles.confSpecWrapper}>
                <div className={styles.column}>
                    <div>
                        <div className={styles.inputDiv}>
                            key
                            <input
                                type="text"
                                name="key"
                                className={styles.customInput}
                                required
                                list="key-input-list"
                            />
                        </div>
                    <datalist id="key-input-list">
                        {
                            Constants.KEY_DATALIST.map(
                                option => {
                                    return <option>{option}</option>
                                }
                            )
                        }
                    </datalist>
                    <div className={styles.inputDiv}>
                        type
{/*                        <Select
                            className={styles.customInput}
                            placeholder={Constants.SELECT_PLACEHOLDER}
                            options = {Constants.TYPE_OPTIONS}
                        >
                        </Select>*/}
            <select name="type" className={styles.customInput} defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                            {
                                Constants.TYPE_OPTIONS.map(
                                    option => {
                                        return <option>{option}</option>
                                    }
                                )
                            }
                        </select>
                    </div>
                    <div className={styles.inputDiv}>
                        label
                        <input type="text" name="label" className={styles.customInput} required/>
                    </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div>
                    <div className={styles.inputDiv}>
                        tooltip
                        <input type="text" name="tooltip" className={styles.customInput}/>
                    </div>
                    <div className={styles.inputDiv}>
                        subtype
                        <input type="text" name="subtype" className={styles.customInput}/>
                    </div>
                    <div className={styles.checkbox}>
                        required
                        <input type="checkbox" name="required"/>
                    </div>
                    <div className={styles.inputDiv}>
                        group
                        <input type="text" name="group" className={styles.customInput}/>
                    </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div>
                            Options
                                <button className={styles.addNewButton}> Add new</button>
                        </div>
                        <div className={styles.closeIcon}>x</div>
                    </div>
                    <div>
                        <Options/>
                    </div>
                </div>
            </div>)

    }
}
