import { otherInputsReducer } from "./otherInputsReducer";
import { externalReferencesReducer } from "./externalReferencesReducer";
import { configurationSpecReducer } from "./configurationSpecReducer";
import { propertiesReducer } from "./propertiesReducer";
import { capabilitiesReducer } from "./capabilitiesReducer";

export const rootReducer = (state = {}, action) => {
    const {
        external_references,
        configuration_spec,
        properties,
        capabilities,
        ...otherInputs
    } = state;
    return {
        ...otherInputsReducer(otherInputs, action),
        properties: propertiesReducer(properties, action),
        capabilities: capabilitiesReducer(capabilities, action),
        external_references: externalReferencesReducer(external_references, action),
        configuration_spec: configurationSpecReducer(configuration_spec, action) // Add filter when saving?
    }
}
