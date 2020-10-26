import {Validator} from "jsonschema";

export const v = new Validator();

const Properties = {
"type": "object"
}

const Capability = {
    "id": "/Capability",
    "type": "object",
        "properties": {
        "id": {
            "type": "string",
                "enum": [
                "respond",
                "observe",
                "health",
                "tiles",
                "refer",
                "deliberate"
            ]
        },
        "description": {
            "type": "string"
        }
    },
    "additionalProperties": false,
        "required": [
        "id",
        "description"
    ]
}

const ExternalReference =  {
    "id": "/ExternalReference",
    "type": "object",
        "properties": {
        "label": {
            "type": "string"
        },
        "link": {
            "type": "string"
        }
    },
    "additionalProperties": false,
        "required": [
        "label",
        "link"
    ]
}

const ConfigurationSpecOptions = {
    "id": "/ConfigurationSpecOptions",
    "type": "object",
        "properties": {
        "value": {
            "type": "string"
        },
        "label": {
            "type": "string"
        }
    },
    "additionalProperties": false,
        "required": [
        "value",
        "label"
    ]
}

const ConfigurationSpecField = {
    "id": "/ConfigurationSpecField",
    "type": "object",
        "properties": {
        "key": {
            "type": "string"
        },
        "type": {
            "type": "string",
                "enum": [
                "password",
                "string",
                "api_key",
                "integer",
                "device",
                "options",
                "boolean"
            ]
        },
        "label": {
            "type": "string"
        },
        "tooltip": {
            "type": "string"
        },
        "subtype": {
            "type": "string"
        },
        "required": {
            "type": "boolean"
        },
        "options": {
            "type": "array",
                "items": {
                "$ref": "/ConfigurationSpecOptions"
            }
        },
        "group": {
            "type": "string"
        }
    },
    "additionalProperties": false,
        "required": [
        "key",
        "type",
        "label"
    ]
}

v.addSchema(Capability, '/Capability');
v.addSchema(ExternalReference, '/ExternalReference');
v.addSchema(Properties, '/Properties');
v.addSchema(ConfigurationSpecOptions, '/ConfigurationSpecOptions');
v.addSchema(ConfigurationSpecField, '/ConfigurationSpecField');



export const VALIDATION_SCHEMA = {
    "type": "object",
    "properties": {
        "description": {"type": "string"},
        "tips": {"type": "string"},
        "logo": {"type": "string"},
        "short_description": {"type": "string"},
        "title": {"type": "string"},
        "external_references": {
            "type": "array",
            "items": {
                "$ref": "/ExternalReference"
            }
        },
        "configuration_spec": {
            "type": "array",
            "items": {
                "$ref": "/ConfigurationSpecField"
            }
        },
        "capabilities": {
            "type": "array",
            "items": {
                "$ref": "/Capability"
            }
        },
        "properties": {
            "$ref": "/Properties"
        },
    },
    "required": ["title", "default_name"]
};
