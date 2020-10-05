import React from "react";
import styles from './Header.module.scss';
import * as Constants from "../../../../globals/constants/constants";
import Icons from "../../../../globals/icons/sprite.svg";


class Header extends React.Component {
    render() {
        return <div className={styles.header}>
            <div>
                <svg className={styles.iconCiscoLogo}>
                    <use xlinkHref={`${Icons}#icon-cisco-logo`}/>
                </svg>
            </div>
            <div>
                <p className={styles.title}>{Constants.HEADER_TITLE}</p>
            </div>
        </div>;
    }
}

export default Header;
