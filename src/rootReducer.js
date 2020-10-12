import { otherInputsReducer } from "./container/Content/otherInputsReducer";
import { externalReferencesReducer } from "./container/Content/components/ExternalReferences/externalReferencesReducer";
import { configurationSpecReducer } from "./container/Content/components/ConfigurationSpec/configurationSpecReducer";
import { propertiesReducer } from "./container/Content/components/Properties/propertiesReducer";
import { capabilitiesReducer } from "./container/Content/components/Capabilities/capabilitiesReducer";

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
        configuration_spec: configurationSpecReducer(configuration_spec, action)
    }
}
