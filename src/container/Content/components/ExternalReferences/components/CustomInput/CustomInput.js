import "./CustomInput.scss";
import React from "react";


export default class CustomInput extends React.Component {
    render() {
        return(
            <div className="reference_wrapper">
                <input type="text" placeholder="Enter label" className="custom_input"
                       autoComplete="off"/>
                <input type="text" placeholder="Enter link" className="custom_input"
                       autoComplete="off"/>
            </div>
        )
    }
}
