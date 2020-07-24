function save() {
    let form = new FormData(document.querySelector('form'));
    let json = as_json(form);

    // Create a `Blob` with the file content.
    let type = 'text/plain';
    let name = 'settings.json';
    let blob = new Blob([json], {type: type});

    // Download the file.
    let element = document.createElement('a');
    let url = window.URL.createObjectURL(blob);

    element.href = url;
    element.download = name;
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    window.URL.revokeObjectURL(url);
}

async function push() {
    let region = '';  // TODO.
    let url =  'https://visibility.amp.cisco.com';

    async function authorize(id, password) {
        let response = await fetch(url + '/iroh/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(id + ':' + password)
            },
            body: 'grant_type=client_credentials'
        });
        let data = await response.json();

        return data['access_token'];
    }

    async function create(body, token) {
        let response = await fetch(url + '/iroh/iroh-int/module-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: body
        });
        let data = await response.json();

        return data;
    }

    // Authorize to Threat Response.
    let id = document.getElementById('client-id').value;
    let password = document.getElementById('client-password').value;
    let token = await authorize(id, password);

    // Create a new module type.
    let form = new FormData(document.querySelector('form'));
    let json = as_json(form);

    await create(json, token);
}

function as_json(form) {
    let json = {
        title: form.get('title'),
        default_name: form.get('default-name'),
        short_description: form.get('short-description'),

        // TODO.
        // external_references: [form.get('external-references')],
        // configuration_spec: [form.get('configuration-spec')],
        // capabilities: [form.get('capabilities')],

        external_references: [],
        configuration_spec: [],
        capabilities: [],
        properties: {},
        flags: [form.get('flags')],
        logo: form.get('logo'),
        description: form.get('description'),
        tips: form.get('tips')
    };

    return JSON.stringify(json);
}
