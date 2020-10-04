import React from "react";
import styles from './Header.module.scss';


class Header extends React.Component {
    render() {
        return <div className={styles.header}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 20" className={styles.iconCiscoLogo}>
                    <path d="M1,5.25a1,1,0,0,0-1,1v1.5a1,1,0,0,0,2,0V6.25A1,1,0,0,0,1,5.25Z"/>
                    <path d="M5.5,8.75a1,1,0,0,0,1-1V4.25a1,1,0,0,0-2,0v3.5A1,1,0,0,0,5.5,8.75Z"/>
                    <path d="M15.5,7.75V4.25a1,1,0,0,0-2,0v3.5a1,1,0,0,0,2,0Z"/>
                    <path d="M23.5,8.75a1,1,0,0,0,1-1V4.25a1,1,0,0,0-2,0v3.5A1,1,0,0,0,23.5,8.75Z"/>
                    <path d="M32.5,8.75a1,1,0,0,0,1-1V4.25a1,1,0,0,0-2,0v3.5A1,1,0,0,0,32.5,8.75Z"/>
                    <path d="M19,5.25a1,1,0,0,0-1,1v1.5a1,1,0,0,0,2,0V6.25A1,1,0,0,0,19,5.25Z"/>
                    <path d="M37,5.25a1,1,0,0,0-1,1v1.5a1,1,0,0,0,2,0V6.25A1,1,0,0,0,37,5.25Z"/>
                    <path d="M11,9.75V1.25a1,1,0,0,0-2,0v8.5a1,1,0,0,0,2,0Z"/>
                    <path d="M29,9.75V1.25a1,1,0,0,0-2,0v8.5a1,1,0,0,0,2,0Z"/>
                    <path
                        d="M3,16.54A3.43,3.43,0,0,0,6.611,20a5.49,5.49,0,0,0,1.561-.238V17.969a3.044,3.044,0,0,1-1.438.354,1.785,1.785,0,1,1,0-3.565,3.018,3.018,0,0,1,1.438.356V13.321a5.292,5.292,0,0,0-1.561-.239A3.431,3.431,0,0,0,3,16.54Z"/>
                    <path
                        d="M20.859,16.54A3.432,3.432,0,0,0,24.474,20a5.515,5.515,0,0,0,1.559-.238V17.969a3.06,3.06,0,0,1-1.44.354,1.785,1.785,0,1,1,0-3.565,3.031,3.031,0,0,1,1.44.356V13.321a5.3,5.3,0,0,0-1.559-.239A3.432,3.432,0,0,0,20.859,16.54Z"/>
                    <path
                        d="M31.416,13.082A3.461,3.461,0,1,0,35,16.54,3.455,3.455,0,0,0,31.416,13.082Zm0,5.216a1.758,1.758,0,1,1,1.77-1.758A1.739,1.739,0,0,1,31.416,18.3Z"/>
                    <rect x="10.524" y="13.2" width="1.711" height="6.681"/>
                    <path
                        d="M17.585,15.847l-.472-.149c-.282-.087-.785-.229-.785-.636,0-.321.373-.547,1.059-.547a5.945,5.945,0,0,1,1.338.2V13.292a7.442,7.442,0,0,0-1.668-.213c-1.578,0-2.527.84-2.527,2.089,0,1.106.794,1.658,1.748,1.955l.365.116c.424.132.763.327.763.666,0,.378-.391.623-1.243.623a6.482,6.482,0,0,1-1.616-.248v1.538A10.46,10.46,0,0,0,16.394,20c1.31,0,2.808-.564,2.808-2.242A2.016,2.016,0,0,0,17.585,15.847Z"/>
                </svg>
                </div>
            <div>
                <p className={styles.title}>Threat Response Module Maker</p>
            </div>
        </div>;
    }
}

export default Header;