export const SELECT_PLACEHOLDER = "Select your option";
export const LOGO = "logo";
export const SUPPORTED_APIS = "supported-apis";
export const IROH_SERVICES_URLS = {
    "Europe": "https://visibility.eu.amp.cisco.com",
    "North America": "https://visibility.amp.cisco.com",
    "Asia": "https://visibility.apjc.amp.cisco.com"
}

// Content.js
export const MAIN_TITLE = "Module";
export const INPUT_TITLE_LABEL = "Title";
export const DEFAULT_NAME_LABEL = "Default Name";
export const SHORT_DESCRIPTION_LABEL = "Short Description";
export const DESCRIPTION_LABEL = "Description";
export const TIPS_LABEL = "Tips";
export const FLAGS_LABEL = "Flags";
export const FLAGS_PLACEHOLDER = "Enter flags separated by commas";
export const LOGO_LABEL = "Logo";

// Capabilities.js
export const CAPABILITIES_TEXT = "Select at least one of " +
    "the Supported APIs to write a description";

// Sidebar.js
export const SIDEBAR_TITLE = "Settings";
export const OPEN_FROM_FILE = "Open JSON from File";
export const OPEN_FROM_API = "Open JSON from TR API";
export const SAVE_JSON = "Save JSON";
export const PUSH_JSON = "Push JSON to TR";
export const VALIDATION_ERROR_MESSAGE = "Wrong JSON structure: ";
export const FILE_LOADING_FAILURE = "Error occurred reading file: ";
export const JSON_ELEMENTS_ORDER = [
    "title", "default_name", "short_description",
    "description", "tips", "external_references",
    "configuration_spec", "capabilities",
    "properties", "flags", "logo"
];

// ConfigurationSpec.js
export const ADD_BTN_TITLE = "+ Add";

// ConfigurationSpecItem.js
export const KEY_DATALIST = [
    "basic-auth-password", "basic-auth-user", "token", "url", "user"
];
export const TYPE_OPTIONS = [
    "api_key", "boolean", "device", "integer", "options", "password", "string"
];
export const TOOLTIP_LABEL = "tooltip";
export const SUBTYPE_LABEL = "subtype";
export const GROUP_LABEL = "group";
export const REQUIRED_LABEL = "required";
export const LABEL = "label";
export const TYPE_LABEL = "type";
export const KEY_LABEL = "key";

// OptionsItem.js
export const VALUE_FIELD_TEXT = "value";
export const LABEL_FIELD_TEXT = "label";

// Options.js
export const OPTIONS_SECTION_LABEL = "Options";
export const OPTIONS_BTN_TITLE = "+ Add";

// Header.js
export const HEADER_TITLE = "Threat Response Module Maker";

// ExternalReferences.js
export const LABELS = ["Sign Up", "Free Trial", "Contact Us"];
export const SECTION_TITLE = "External References";

// ModalForPush.js
export const AUTH_ENDPOINT = "/iroh/oauth2/token";
export const MODULE_TYPE_ENDPOINT = "/iroh/iroh-int/module-type";
export const MESSAGE_SUCCESS = "The module type was successfully created with id: "
export const PUSH_MODAL_TEXT = "Create a new module type in your Threat Response organization";
export const CLIENT_ID_LABEL = "Client ID";
export const CLIENT_PASSWORD_LABEL = "Client Password";
export const PUSH_BTN_TITLE = "Push";
export const CANCEL_BTN_TITLE = "Cancel";

// ModalForPull.js
export const PULL_BTN_TITLE = "Pull";
export const PULL_MODAL_TEXT = "Pull module type from your Threat Response organization";
export const MODULE_TYPE_ID = "Module Type ID";
export const REGION_LABEL = "Region";

// AuthType.js
export const AUTH_LABEL = "authorization";
export const AUTH_TYPE_OPTIONS = ["authorization-header", "basic", "bearer", "configuration-token"];

// ConfToken.js
export const CONF_TOKEN_OPTIONS = ["RS256", "HS256"];
export const CONFIGURATION_TOKEN = "configuration-token";
export const CONFIGURATION_TOKEN_ALG = "configuration-token-alg";
export const CONFIGURATION_TOKEN_AUDIENCE = "configuration-token-audience";

// ConfTokenDetail.js
export const CUSTOM_JWKS_HOST = "custom_jwks_host";
export const CONFIGURATION_TOKEN_KEY = "configuration-token-key";

// CustomAlert.js
export const CLOSE_BTN_LABEL = "Close";
export const ALERT_TITLE_FAILURE = "Failure: an error occurred";
export const ALERT_TITLE_SUCCESS = "Success";
