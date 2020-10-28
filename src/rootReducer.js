import { otherInputsReducer } from "./container/Content/otherInputsReducer";
import { externalReferencesReducer } from "./container/Content/components/ExternalReferences/externalReferencesReducer";
import { configurationSpecReducer } from "./container/Content/components/ConfigurationSpec/configurationSpecReducer";
import { propertiesReducer } from "./container/Content/components/Properties/propertiesReducer";
import { capabilitiesReducer } from "./container/Content/components/Capabilities/capabilitiesReducer";
import { combineReducers } from "redux";
import { READ_STATE_FROM_BACKEND } from "./globals/constants/types";
import { v4 as uuidv4 } from 'uuid';


const appReducer = combineReducers({
            other_inputs: otherInputsReducer,
            properties: propertiesReducer,
            capabilities: capabilitiesReducer,
            external_references: externalReferencesReducer,
            configuration_spec: configurationSpecReducer
    }
)

export const rootReducer = (state, action) => {
    if (action.type === READ_STATE_FROM_BACKEND) {
        const references = action.payload.external_references.map(
            ref => Object.assign(ref, {id: uuidv4()})
        )
        for (const elem of action.payload.configuration_spec) {
            if (elem.options) {
                elem.options.map(
                    option => option["id"] = uuidv4()
                )
            }
            elem["id"] = uuidv4()
        }

        return {
            ...state, external_references: references,
            configuration_spec: action.payload.configuration_spec,
            properties: action.payload.properties,
            capabilities: action.payload.capabilities,
            other_inputs: {
                title: action.payload.title,
                short_description: action.payload.short_description,
                tips: action.payload.tips,
                description: action.payload.description,
                flags: action.payload.flags,
                logo: action.payload.logo,
                default_name: action.payload.default_name
            }
        }
    }
    return appReducer(state, action)
}
