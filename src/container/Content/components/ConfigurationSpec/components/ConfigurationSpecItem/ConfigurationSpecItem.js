import React from "react";
import "./ConfigurationSpecItem.scss"
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";
import Options from "../Options/Options";


export default class ConfigurationSpecItem extends React.Component {
    render() {
        return (
            <div className="confSpecWrapper">
                <div className="column">
                    <div>
                        <div className="inputDiv">
                            key
                            <input
                                type="text"
                                name="key"
                                className="customInput"
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
                        <div className="inputDiv">
                            type
                            <select name="type" className="customInput" defaultValue={'DEFAULT'}>
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
                        <div className="inputDiv">
                            label
                            <input type="text" name="label" className="customInput" required/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div>
                        <div className="inputDiv">
                            tooltip
                            <input type="text" name="tooltip" className="customInput"/>
                        </div>
                        <div className="inputDiv">
                            subtype
                            <input type="text" name="subtype" className="customInput"/>
                        </div>
                        <div className="inputDiv">
                            group
                            <input type="text" name="group" className="customInput"/>
                        </div>
                        <div className="checkboxDiv">
                            required
                            <input type="checkbox" name="required"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="confSpecRow">
                        <div>
                            Options
                            <button className="addNewButton">Add new</button>
                        </div>
                        <div>
                            <svg className="closeIcon">
                                <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                            </svg>
                        </div>
                    </div>
                    <Options/>
                </div>
            </div>
        )
    }
}
