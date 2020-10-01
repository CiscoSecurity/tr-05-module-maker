import React from "react";
import SupportedAPI from "./SupportedAPI";
import AuthType from "./AuthType";
import styles from "./Properties.module.scss"
import {connect} from "react-redux";


class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apis: [
                {checked: false, title: 'health', class: 'health'},
                {checked: false, title: 'deliberate/observables', class: 'deliberate'},
                {checked: false, title: 'refer/observables', class: 'refer'},
                {checked: false, title: 'observe/observables', class: 'observe'},
                {checked: false, title: 'respond/observables', class: 'respond'},
                {checked: false, title: 'respond/trigger', class: 'respond'},
                {checked: false, title: 'tiles', class: 'tiles'},
                {checked: false, title: 'tiles/tile', class: 'tiles'},
                {checked: false, title: 'tiles/tile-data', class: 'tiles'},
            ]
        }
    };

    render() {
        return (
            <div>
                <p>Properties</p>
                <fieldset>
                    <p>Supported APIs</p>
                    <fieldset>
                        {
                            this.state.apis.map(
                                api => {
                                    return <SupportedAPI api={api} key={api.title}/>
                                }
                            )
                        }
                    </fieldset>
                    <p>Auth-type</p>
                    <fieldset>
                        <AuthType/>
                    </fieldset>
                </fieldset>
            </div>
        )
    }
}

//export default connect(mapStateToProps, null)(Properties);
export default Properties;