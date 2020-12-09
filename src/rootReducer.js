import { additionalInputsReducer } from "./container/Content/additionalInputsReducer";
import { externalReferencesReducer } from "./container/Content/components/ExternalReferences/externalReferencesReducer";
import { configurationSpecReducer } from "./container/Content/components/ConfigurationSpec/configurationSpecReducer";
import { propertiesReducer } from "./container/Content/components/Properties/propertiesReducer";
import { capabilitiesReducer } from "./container/Content/components/Capabilities/capabilitiesReducer";
import { combineReducers } from "redux";
import { READ_STATE_FROM_BACKEND } from "./globals/constants/types";
import { v4 as uuidv4 } from 'uuid';
import { visibilityReducer } from "./container/Content/components/visibilityReducer";
import { patchReducer } from "./container/Content/components/patchReducer";


const appReducer = combineReducers({
            other_inputs: additionalInputsReducer,
            properties: propertiesReducer,
            capabilities: capabilitiesReducer,
            external_references: externalReferencesReducer,
            configuration_spec: configurationSpecReducer,
            elements_visibility: visibilityReducer,
            patch_base: patchReducer
    }
)

function addIDs (currentList) {
    if (currentList) {
        currentList.map(
            el => el.id = uuidv4()
        )
    }
    return currentList || []
}

function reformatConfSpec (spec) {
    spec = addIDs(spec);
    if (spec) {
        spec.map(el => el.options = addIDs(el.options))
    }
    return spec
}

export const rootReducer = (state, action) => {
    if (action.type === READ_STATE_FROM_BACKEND) {
        return {
            ...state,
            external_references: addIDs(action.payload.external_references),
            configuration_spec: reformatConfSpec(action.payload.configuration_spec),
            properties: action.payload.properties || {"supported-apis": []},
            capabilities: action.payload.capabilities || [],
            other_inputs: {
                // The API response contains additional fields that need to be excluded
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
