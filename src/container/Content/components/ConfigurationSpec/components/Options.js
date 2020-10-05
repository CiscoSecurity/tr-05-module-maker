import React from "react";
import  "./Options.scss";
import Icons from "../../../../../globals/icons/sprite.svg";


export default class Options extends React.Component {
    render() {
        return (
            <div className="optionsWrapper">
                <div className="optionsIconWrapper">
                    <svg className="closeIcon">
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>
                </div>
                <div className="inputDiv">
                    value
                    <input type="text" name="option" className="customInput"/>
                </div>
                <div className="inputDiv">
                    label
                    <input type="text" name="option" className="customInput"/>
                </div>
            </div>
        )
    }
}
