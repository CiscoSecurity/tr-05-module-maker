async function save() {
    let form = document.querySelector('form')
    let isValid = form.reportValidity();
    if (isValid) {
        form = new FormData(form);
        let json = await as_json(form);

        // Create a `Blob` with the file content.
        let type = 'text/plain';
        let name = 'Module_UI_settings.json';
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
    else {
        alert('Please, fill out highlighted fields')
    }
}

function isValid(form){
    let result = 'true'
    let creds = document.getElementsByClassName('creds');
    for (let i = 0; i < creds.length; i++){
        result = result && creds[i].reportValidity();
    }
    result = result && form[0].reportValidity();
    return  result;
}

async function push() {
    let form = document.querySelector('form');

    if (isValid(form)) {
        let url = 'https://visibility.amp.cisco.com';

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

            if (response.ok) {
                let data = await response.json();
                alert('The module type was successfully created with id: ' + data['id']);
            } else {
                alert('Error: ' + response.statusText);
            }
        }

        // Authorize to Threat Response.
        let id = document.getElementById('client-id').value;
        let password = document.getElementById('client-password').value;
        let token = await authorize(id, password);

        // Create a new module type.
        form = new FormData(form);
        let json = await as_json(form);
        await create(json, token);
    }
    else {
        alert('Please, fill out highlighted fields')
    }
}


function getBase64(file) {
    if (file) {
        return new Promise(resolve => {
                let reader = new FileReader();
                reader.onloadend = function (e) {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        );
    }
}

function getSelectedProperties() {
  let result = {};
  result['supported-apis'] = [];
  let properties = document.getElementsByName('properties')[0];
  let checkboxes = properties.getElementsByTagName('input');
  for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          result['supported-apis'] =
              result['supported-apis'].concat(checkboxes[i].id);
      }
  }
  let auth_type = document.getElementsByName('auth-type')[0];
  let select = auth_type.getElementsByTagName('select');
  let checkbox = auth_type.getElementsByTagName('input');
  if (checkbox[0].checked) {
      result['auth-type'] = select[0].value;
  }
  return result;
}

function getOptions(config_fieldset) {
    let options = config_fieldset.getElementsByClassName('options');
    let options_list = [];

    for (let i = 0; i < options.length; i++) {
        let option_pair = {};
        let option = options[i].getElementsByTagName('input');
        if (option[0].value) {
            option_pair['value'] = option[0].value;
        }
        if (option[1].value) {
            option_pair['label'] = option[0].value;
        }
        if (Object.keys(option_pair).length > 0){
            options_list = options_list.concat(option_pair);
        }
    }

    return options_list
}

function getConfSpec() {
  let result = [];
  let confs = document.getElementsByClassName('conf-spec-fieldset');

  for (let i = 0; i < confs.length; i++) {

    let fields = confs[i].getElementsByTagName('input');
    let select = confs[i].getElementsByTagName('select');
    let conf_json = {};

    for (let j = 0; j < fields.length; j++) {
      if (fields[j].value) {
        if (fields[j].name === 'required' ) {
           conf_json[fields[j].name] = fields[j].checked;
        }
        else {
          if (fields[j].name !== 'option') {
            conf_json[fields[j].name] = fields[j].value;
          }
        }
      }
    }

    let options = getOptions(confs[i]);
    if (Object.keys(conf_json).length > 0) {
      conf_json['type'] = select[0].value;
      conf_json['options'] = options;
      result = result.concat(conf_json);
    }
  }
  return result;
}

function getCapabilities() {
    let result = [];
    let fieldset = document.getElementById('capabilities-fieldset');
    let capabilities = fieldset.getElementsByTagName('input');
    for (let i = 0; i < capabilities.length; i++){
        let json = {};
        json['id'] = capabilities[i].name;
        json['description'] = capabilities[i].value;
        result = result.concat(json);
    }
    return result;
}

function getExternalReferences() {
    let result = [];
    let fieldset =
        document.getElementsByClassName('external-references')[0];
    let predefined_inputs =
        fieldset.getElementsByClassName('hidden-input');
        for (let i = 0; i < predefined_inputs.length; i++){
            if (predefined_inputs[i].value) {
                let json = {};
                json['label'] = predefined_inputs[i].name;
                json['link'] = predefined_inputs[i].value;
                result = result.concat(json);
            }
    }
    let link_label_pairs =
        fieldset.getElementsByClassName('link-label-pairs');
        for (let i = 0; i < link_label_pairs.length; i++){
            let inputs =
                link_label_pairs[i].getElementsByTagName('input');
            if (inputs[0].value) {
                let json = {};
                json['label'] = inputs[0].value;
                json['link'] = inputs[1].value;
                result = result.concat(json);
            }
        }

 return result;
}

async function as_json(form) {
    let json = {
        title: form.get('title'),
        default_name: form.get('default-name'),
        short_description: form.get('short-description'),
        external_references: getExternalReferences(),
        configuration_spec: getConfSpec(),
        capabilities: getCapabilities(),
        properties: getSelectedProperties(),
        flags: form.get('flags').split(','),
        logo: await getBase64(form.get('logo')),
        description: form.get('description'),
        tips: form.get('tips')
    };
    return JSON.stringify(json);
}

function showInputForLinks(checkbox_id) {
    let CheckBox = document.getElementById(checkbox_id);
    let InputText = document.querySelector(`input[id=${checkbox_id}Value]`);
    if (CheckBox.checked === false) {
        InputText.style.visibility = 'hidden';
    }
    else {
        InputText.style.visibility = 'visible';
        InputText.placeholder = 'Enter link';
        InputText.value = '';
    }
}

async function showAPIInput(current_class) {
    let api_checklist = document.getElementsByClassName(current_class);
    let atLeastOneChecked = false;

    for (let i = 0; i < api_checklist.length; i++)
        atLeastOneChecked = atLeastOneChecked || api_checklist[i].checked;
        if (!atLeastOneChecked) {
            document.getElementById(`${current_class}-div`).remove()
        } else {
            if (!document.getElementById(`${current_class}Value`)) {
                let newInput = (await (await fetch('supported_apis.html')).text());
                newInput = newInput.replace(
                    /current_class/g, String(current_class)
                )
                let fieldset = document.getElementById('capabilities-fieldset')
                fieldset.insertAdjacentHTML('beforeend', newInput);
            }
        }
}

function showAuthSelectMenu(select_id, checkbox) {
  let checkBox = document.getElementById(checkbox);
  let select = document.querySelector(`select[id=${select_id}]`);
  if (checkBox.checked === false) {
    select.style.visibility = 'hidden';
  }
  else {
    select.style.visibility = 'visible';
  }
}

async function addConfigFieldset() {
    let count = document.getElementsByClassName('conf-spec-fieldset').length;
    let newInput = (await (await fetch('configuration_spec.html')).text());
    newInput = newInput.replace(/counter/g, String(count));
    let wrapper = document.getElementById('wrapper');
    wrapper.insertAdjacentHTML('beforeend', newInput);

    let addOptionsIcon =
        document.getElementsByClassName(`add-icon-${count}`)[0];
    addOptionsIcon.addEventListener(
        'click', () => addOptions(`wrapper-of-options-${count}`)
    );

    let removeOptionsIcon =
        document.getElementsByClassName(`remove-icon-${count}`)[0];
    removeOptionsIcon.addEventListener(
        'click', () => removeOptions(`wrapper-of-options-${count}`)
    );
}

function removeConfigFieldset() {
  let childs = document.body.getElementsByClassName('conf-spec');
  if (childs.length > 0) {
    let wrapper = document.getElementById('wrapper');
    wrapper.removeChild(wrapper.lastElementChild);
  }
}

async function addOptions(id_of_wrapper) {
  let newInput = await (await fetch('options.html')).text();
  let wrapper = document.getElementById(id_of_wrapper)
  wrapper.insertAdjacentHTML('beforeend', newInput);
}

function removeOptions(id_of_wrapper) {
    let childs = document.getElementsByName('option');
    if (childs.length > 0) {
        let wrapper = document.getElementById(id_of_wrapper);
        wrapper.removeChild(wrapper.lastElementChild);
    }
}

document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('addConfigIcon').addEventListener(
            'click', addConfigFieldset);
        document.getElementById('removeConfigIcon').addEventListener(
            'click', removeConfigFieldset);
        let propertiesFieldset = document.getElementsByName('properties')[0];
        let apisCheckboxes = propertiesFieldset.getElementsByTagName('input');
        for (let i = 0; i < apisCheckboxes.length; i++) {
            apisCheckboxes[i].addEventListener(
                'change', () => showAPIInput(apisCheckboxes[i].className)
            )
        }
    }
);
