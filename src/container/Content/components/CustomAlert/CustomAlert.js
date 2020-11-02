import React from "react";
import "./CustomAlert.scss"
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";

export const CustomAlert = ({title, message, closeAlertHandler}) => (
    <div className="alert">
        <div className="alertContent">
            <div className="alertHeader">
                {title}
                <svg className="closeIcon" onClick={closeAlertHandler}>
                    <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                </svg>
            </div>
            <div className="alertBody">
                {message}
            </div>
            <div className="alertFooter">
                <button type="button"
                        className="closeButton"
                        onClick={closeAlertHandler}>
                    {Constants.CLOSE_BTN_LABEL}
                </button>
            </div>
        </div>
    </div>
)
