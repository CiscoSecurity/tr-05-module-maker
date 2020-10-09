import "./CustomInput.scss";
import React from "react";
import * as Constants from "globals/constants/constants";


export default class CustomInput extends React.Component {
    render() {
        return(
            <div className="reference_wrapper">
                <input type="text" placeholder="Enter label" className="custom_input"
                       autoComplete="off" list="ext-ref"/>
                <input type="text" placeholder="Enter link" className="custom_input"
                       autoComplete="off" />
                <datalist id="ext-ref">
                    {
                        Constants.LABELS.map(
                            option => {
                                return <option>{option}</option>
                            }
                        )
                    }
                </datalist>
            </div>
        )
    }
}
