import React from "react";
import SupportedAPI from "./components/SupportedAPI/SupportedAPI";
import AuthType from "./components/AuthType/AuthType";


class Properties extends React.Component {
    state = {
            apis: [
                {title: 'health', class: 'health'},
                {title: 'deliberate/observables', class: 'deliberate'},
                {title: 'refer/observables', class: 'refer'},
                {title: 'observe/observables', class: 'observe'},
                {title: 'respond/observables', class: 'respond'},
                {title: 'respond/trigger', class: 'respond'},
                {title: 'tiles', class: 'tiles'},
                {title: 'tiles/tile', class: 'tiles'},
                {title: 'tiles/tile-data', class: 'tiles'},
            ]
        }

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

export default Properties;
