export const ID = '00000000-0000-0000-0000-000000000000';

export const UPDATE_SINGLE_INPUT_MOCK = {name: 'title', value: 'Test'};
export const UPDATE_FlAGS_MOCK =  ['serverless', 'test'];
export const LOAD_FILE_MOCK = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA" +
    "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO" +
    "9TXL0Y4OHwAAAABJRU5ErkJggg==";


export const UPDATE_CAPABILITY_DESCR_MOCK =  {
    id: 'health',
    description: 'Check the health of some API'
};

export const EMPTY_CONF_SPEC_MOCK = {
    key: '',
    type: '',
    label: '',
    tooltip: '',
    subtype: '',
    required: false,
    group: '',
    options: [],
    id: ID
}

export const UPDATED_CONF_SPEC_MOCK = {
    key: 'url',
    type: '',
    label: '',
    tooltip: '',
    subtype: '',
    required: false,
    group: '',
    options: [],
    id: ID
}

export const EMPTY_EXTERNAL_REFERENCE_MOCK = {
    link: '',
    label: '',
    id: ID
}

export const FILLED_CONF_SPEC_MOCK = {
    key: 'url',
    type: 'string',
    label: 'URL',
    required: true,
    tooltip: 'The base URL of the Serverless Relay',
    options: [
        {
            value:"https://example.com/",
            label:"https://example.com/",
            id: '00000000-0000-0000-0000-000000000001'
        }
    ],
    id: '00000000-0000-0000-0000-000000000002'
}

export const FILLED_CONF_SPEC_MOCK_WITH_UPDATED_OPTION = {
    key: 'url',
    type: 'string',
    label: 'URL',
    required: true,
    tooltip: 'The base URL of the Serverless Relay',
    options: [
        {
            value:"https://example.com/",
            label:"test label",
            id: '00000000-0000-0000-0000-000000000001'
        }
    ],
    id: '00000000-0000-0000-0000-000000000002'
}

export const FILLED_CONF_SPEC_WITHOUT_OPTIONS_MOCK = {
    key: 'url',
    type: 'string',
    label: 'URL',
    required: true,
    tooltip: 'The base URL of the Serverless Relay',
    options: [],
    id: '00000000-0000-0000-0000-000000000002'
}

export const EXTERNAL_REFERENCES = [
    {
        label: "Sign Up",
        link: "https://haveibeenpwned.com/API/Key",
        id: '00000000-0000-0000-0000-000000000003'
    },
    {
        label: "FAQs",
        link: "https://haveibeenpwned.com/FAQs",
        id: '00000000-0000-0000-0000-000000000004'
    },
]

export const PROPERTIES_MOCK = {
    'supported-apis': [
        'health',
        'observe/observables',
        'deliberate/observables'
],
    'auth-type': 'bearer'
}

export const CAPABILITIES_MOCK = [
    {
        id: 'health',
        description: 'Check that API is responding and API crednetials are valid'
    },
    {
        id: 'deliberate',
        description: 'Query IsItPhishing for URL return Verdic'
    },
    {
        id: 'observe',
        description: 'Query IsItPhishing for URL return Judgement, and Verdict'
    }
]

export const JSON_FOR_OPENING_IN_APP = {
    external_references: [
        {
            label: "Sign Up",
            link: "https://haveibeenpwned.com/API/Key",
        },
        {
            label: "FAQs",
            link: "https://haveibeenpwned.com/FAQs",
        },
    ],
    configuration_spec: [{
        key: 'url',
        type: 'string',
        label: 'URL',
        required: true,
        tooltip: 'The base URL of the Serverless Relay',
        options: [
            {
                value: "https://example.com/",
                label: "https://example.com/",
            }
        ]
    }],
    properties: PROPERTIES_MOCK,
    capabilities: CAPABILITIES_MOCK,
    title: 'test title',
    short_description: 'test short_description',
    tips: 'test tips',
    description: 'test description',
    flags: 'test description flags',
    logo: LOAD_FILE_MOCK,
    default_name: 'test default_name'
}

export const STATE_BEFORE_UPLOADING_JSON = {
    external_references: [],
    configuration_spec: [],
    properties: {},
    capabilities: [],
    other_inputs: {}
}

export const STATE_AFTER_UPLOADING_JSON = {
    "capabilities": [
        {
            "description": "Check that API is responding and API crednetials are valid",
            "id": "health"
        },
        {
            "description": "Query IsItPhishing for URL return Verdic",
            "id": "deliberate"
        },
        {
            "description": "Query IsItPhishing for URL return Judgement, and Verdict",
            "id": "observe"
        }
    ],
    "configuration_spec": [{
        "id": "00000000-0000-0000-0000-000000000000",
        "key": "url",
        "label": "URL",
        "options": [
            {
                "id": "00000000-0000-0000-0000-000000000000",
                "label": "https://example.com/",
                "value": "https://example.com/"
            }
        ],
        "required": true,
        "tooltip": "The base URL of the Serverless Relay",
        "type": "string"
    }],
    "external_references": [
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "label": "Sign Up",
            "link": "https://haveibeenpwned.com/API/Key"
        },
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "label": "FAQs",
            "link": "https://haveibeenpwned.com/FAQs"
        }
    ],
    "other_inputs": {
        "default_name": "test default_name",
        "description": "test description",
        "flags": "test description flags",
        "logo": LOAD_FILE_MOCK,
        "short_description": "test short_description",
        "tips": "test tips",
        "title": "test title"
    },
    "properties": {
        "auth-type": "bearer",
        "supported-apis": [
            "health",
            "observe/observables",
            "deliberate/observables"
        ]
    }
}