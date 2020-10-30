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

function addIDs (list) {
    if (list) {
        for (const elem of list) {
            if (elem.options) {
                addIDs(elem.options);
            }
            elem["id"] = uuidv4()
        }
    }
    return list || []
}

export const rootReducer = (state, action) => {
    if (action.type === READ_STATE_FROM_BACKEND) {
        const {
            external_references,
            configuration_spec,
            properties,
            capabilities,
            ...otherInputs} = action.payload;
        return {
            ...state,
            external_references: addIDs(action.payload.external_references),
            configuration_spec: addIDs(action.payload.configuration_spec),
            properties: action.payload.properties || [],
            capabilities: action.payload.capabilities || [],
            other_inputs: otherInputs
        }
    }
    return appReducer(state, action)
}
