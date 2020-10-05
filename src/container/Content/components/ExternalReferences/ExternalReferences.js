import React from "react";
import PredefinedInput from "./components/PredefinedInput/PredefinedInput";
import CustomInput from "./components/CustomInput/CustomInput";
import * as Constants from "globals/constants/constants";


class ExternalReferences extends React.Component {
    render() {
        return (
            <div>
                <p>External References</p>
                <fieldset>
                    {
                        Constants.LABELS.map(
                            item => (<PredefinedInput label={item}/>)
                        )
                    }
                    <CustomInput/>
                    <CustomInput/>
                </fieldset>
            </div>
        )
    }
}

export default ExternalReferences;
