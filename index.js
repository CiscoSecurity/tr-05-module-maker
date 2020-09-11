const url = 'https://visibility.amp.cisco.com';

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

async function save() {
    let form = document.querySelector('#configuration')
    let isValid = form.reportValidity();
    if (isValid) {
        form = new FormData(form);
        let json = await as_json(form);

        // Create a `Blob` with the file content.
        let type = 'text/plain';
        let title = form.get('title').trim().replace(/ /g, '_')
        let name = `${title}_module_type.json`;
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
    result = result && form.reportValidity();
    return  result;
}

async function push() {
    let form = document.querySelector('#configuration');

    if (isValid(form)) {

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
    if (file.size > 0) {
        return new Promise(resolve => {
                let reader = new FileReader();
                reader.onloadend = function (e) {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        );
    }
    else {
        return ""
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
            option_pair['label'] = option[1].value;
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
    return count;
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
        document.getElementById('openJSONFile').addEventListener(
            'click', openFileOption);
        document.getElementById('openJSONAPI').addEventListener(
            'click', openJSONFromAPIOption);
    }
);

function openFileOption()
{
  let inputElement = document.getElementById('jsonFile');
  inputElement.click();
  inputElement.addEventListener('change', handleFiles, false);
}

async function handleFiles() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = async function (evt) {
        try {
            await mapJSON(evt.target.result);
        }
        catch (e) {
            alert('An error occurred while loading JSON from a file.');
        }
    }
}

async function mapJSON(result) {
    document.getElementById('configuration').reset();
        let json;
        if (typeof result === 'string') {
            json = JSON.parse(result);
        }
        else {
            json = result;
        }

        document.getElementsByName('tips')[0].value =
            json.tips.replace(/\n/g, '\r\n');
        document.getElementsByName('description')[0].value =
            json.description.replace(/\n/g, '\r\n');
        document.getElementById('title').value = json.title;
        document.getElementsByName('default-name')[0].value = json.default_name;
        document.getElementsByName('short-description')[0].value =
            json.short_description;
        document.getElementsByName('flags')[0].value = json.flags.join();

        if (json.capabilities) {
            await setCapabilities(json.capabilities);
        }
        if (json.properties){
            await setProperties(json.properties);
        }
        if (json.logo){
            await setLogo(json.logo);
        }

        let prev_conf =  document.getElementsByClassName('conf-spec-fieldset');
        while (prev_conf.length > 0) {
            prev_conf[0].parentNode.removeChild(prev_conf[0]);
        }
        if (json.configuration_spec) {
        await setConfSpec(json.configuration_spec);
        }

        if (json.external_references) {
            setExternalReferences(json.external_references);
        }
}

async function setProperties(properties) {
    let supported_apis = properties['supported-apis'];
    for (const api of supported_apis) {
        document.getElementById(api).checked = true;
        await showAPIInput(document.getElementById(api).className);
    }
    let select_input = document.getElementById('select_auth');

    let auth_type = properties['auth-type'];
    let options = Array.apply(null, select_input.options).map(el => el.value);
    if (auth_type && options.includes(auth_type)) {
        if (document.getElementById('auth_type').checked !== true) {
            document.getElementById('auth_type').click();
        }
        select_input.value = auth_type;
    }
    else {
        if (document.getElementById('auth_type').checked === true) {
            document.getElementById('auth_type').click();
        }
    }
}

async function setCapabilities(capabilities) {
    for (const pair of capabilities) {
        let apiInput = document.getElementById(`${pair['id']}Value`);
        if (apiInput === null) {
            let newInput = (await (await fetch('supported_apis.html')).text());
            newInput = newInput.replace(
                /current_class/g, pair['id']
            )
            let fieldset = document.getElementById('capabilities-fieldset')
            fieldset.insertAdjacentHTML('beforeend', newInput);
        }
         document.getElementById(`${pair['id']}Value`).value = pair['description'];
    }
}

async function setLogo(logoURL) {
    let res = await fetch(logoURL);
    let blob = await res.blob();
    let type = logoURL.split(';')[0].split('/')[1];
    let extension = type.split('+')[0];

    if (logoURL.split(';')[0].split('/')[0] === 'data:image') {
        let file =
            new File([blob], `logo.${extension}`, {type: `image/${type}`});
        let input = document.getElementById('logo');

        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
    }
}

async function setConfSpec(configuration_specs) {
    for (let spec of configuration_specs) {
        let count = await addConfigFieldset();
        for (let key of Object.keys(spec)) {
            let input = document.getElementsByName(key);
            if (key === 'required' && spec[key] === true) {
                input[count].checked = true;
            }
            else if (key === 'options') {
                for (let i = 0; i < Object.keys(spec['options']).length; i++) {
                    await addOptions(`wrapper-of-options-${count}`);
                    let fieldsets =
                        document.querySelectorAll(`#wrapper-of-options-${count} > fieldset`);
                    let options = fieldsets[i].getElementsByTagName('input');
                    options[0].value = spec['options'][i].value;
                    options[1].value = spec['options'][i].label;
                }
            }
            else {
                input[count].value = spec[key];
            }
        }
    }
}

function setExternalReferences(external_references) {
    let hidden_inputs = document.getElementsByClassName('hidden-input');
    let checkboxes = document.getElementsByClassName('references-checkbox');
    for (let ref of external_references) {
        if (hidden_inputs.namedItem(ref.label)) {
            let checkbox_name = ref.label.split(' '). join('');
            let checkbox = checkboxes.namedItem(checkbox_name);
            if (checkbox.checked !== true) {
                checkbox.click();
            }
            hidden_inputs.namedItem(ref.label).value = ref.link;
        }
        else {
            let link_label_pairs =
                document.getElementsByClassName('link-label-pairs');
            for (let i = 0; i < link_label_pairs.length; i++) {
                let inputs =
                    link_label_pairs[i].getElementsByTagName('input');
                if (!inputs[0].value) {
                    inputs[0].value = ref.label;
                    inputs[1].value = ref.link;
                    break;
                }
            }
        }
    }
}

function getInputs(form) {
    return Array.from(form.elements).filter(
        element => element.tagName.toLowerCase() === 'input'
    );
}

function hideModal(form, modal) {
    let inputs = getInputs(form);
    modal.style.display = 'none';
    inputs.map(input => input.required = false);
    form.reset();
}

function openJSONFromAPIOption() {
    let modal = document.getElementById('modalForPull');
    let span = document.getElementsByClassName('close')[0];
    let form = document.querySelector('#pull-module-type-form');
    let inputs = getInputs(form);
    inputs.map(input => input.required = true);
    modal.style.display = 'block';
    span.onclick = function () {
        hideModal(form, modal)
    };
}

async function pull() {
    let form = document.querySelector('#pull-module-type-form');
    let isValid = form.reportValidity();
    if (isValid) {
        let formData = new FormData(form);

        async function get_module_type(id, token) {
            let response = await fetch(url + '/iroh/iroh-int/module-type/' + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            let data = await response.json();
            if (response.ok) {
                await mapJSON(data);
            } else {
                alert('Error: ' + (data.error_description || response.statusText));
            }
        }

        let client_id = formData.get('pull-client-id');
        let password = formData.get('pull-client-password');
        let module_type_id = formData.get('module-type-id');
        let token = await authorize(client_id, password);

        let modal = document.getElementById('modalForPull');
        await get_module_type(module_type_id, token).then(
            function () {
                hideModal(form, modal)
            }
        );
    }
}
