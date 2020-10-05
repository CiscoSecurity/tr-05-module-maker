import React from "react";
import './Header.scss';
import * as Constants from "globals/constants/constants";
import Icons from "globals/icons/sprite.svg";


class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div>
                    <svg className="iconCiscoLogo">
                        <use xlinkHref={`${Icons}#icon-cisco-logo`}/>
                    </svg>
                </div>
                <div>
                    <p className="headerTitle">{Constants.HEADER_TITLE}</p>
                </div>
            </div>
        )
    }
}

export default Header;
