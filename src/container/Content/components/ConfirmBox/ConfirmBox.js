import React from "react";
import "./ConfirmBox.scss"
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";

export const ConfirmBox = ({title, message, closeClickHandler, okClickHandler}) => (
    <div className="alert">
        <div className="alertContent">
            <div className="alertHeader">
                {title}
                <svg className="closeIcon" onClick={closeClickHandler}>
                    <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                </svg>
            </div>
            <div className="alertBody">
                {message}
            </div>
            <div className="alertFooter">
                <button type="button"
                        className="cancelButton"
                        onClick={closeClickHandler}>
                    {Constants.CANCEL_BTN_TITLE}
                </button>
                <button type="button"
                        className="okButton"
                        onClick={okClickHandler}>
                    {Constants.OK_BTN_LABEL}
                </button>
            </div>
        </div>
    </div>
)
