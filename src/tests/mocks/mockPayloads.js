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
    options: [],
    id: '00000000-0000-0000-0000-000000000001'
}

export const EXTERNAL_REFERENCES = [
    {
        label: "Sign Up",
        link: "https://haveibeenpwned.com/API/Key",
        id: '00000000-0000-0000-0000-000000000002'
    },
    {
        label: "FAQs",
        link: "https://haveibeenpwned.com/FAQs",
        id: '00000000-0000-0000-0000-000000000003'
    },
]