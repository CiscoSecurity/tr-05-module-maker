import { Validator } from "jsonschema";

export const validator = new Validator();

const Properties = {
    "type": "object",
    "properties": {
        "supported-apis": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "auth-type": {
            "type": "string"
        }
    }
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

validator.addSchema(Capability, '/Capability');
validator.addSchema(ExternalReference, '/ExternalReference');
validator.addSchema(Properties, '/Properties');
validator.addSchema(ConfigurationSpecOptions, '/ConfigurationSpecOptions');
validator.addSchema(ConfigurationSpecField, '/ConfigurationSpecField');

export const VALIDATION_SCHEMA = {
    "type": "object",
    "properties": {
        "description": {"type": "string"},
        "tips": {"type": "string"},
        "logo": {"type": "string"},
        "short_description": {"type": "string"},
        "title": {"type": "string"},
        "flags": {"type": "array"},
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
