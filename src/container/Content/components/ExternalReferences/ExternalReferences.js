import React from "react";
import PredefinedInput from "./PredefinedInput";
import CustomInput from "./CustomInput";
import * as Constants from "../../../../globals/constants/constants";


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
