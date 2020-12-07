import { isEqual, transform, isEmpty } from 'lodash';
import { arrangeJSON, formatState } from "./formattingUtils";
import * as Constants from "globals/constants/constants"


export function constructValidJSON(json) {
    const data = JSON.parse(JSON.stringify(json));
    for (const elem of data.configuration_spec) {
        if (elem.options) {
            elem.options.map(
                option => delete option["id"]
            )
        }
        delete elem["id"]
        Object.keys(elem).forEach(
            key => (elem[key].length === 0) && delete elem[key]
        );
    }
    data.external_references.map(
        element => delete element["id"]
    )
    return arrangeJSON(data)
}

function difference(object, base) {
    return  transform(object, (result, value, key) => {
        if (!isEqual(value, base[key])) {
            result[key] = value;
        }
    })
}

export function savePatch(patch_base, current_state, deactivatePatch, showAlert){
    const base = formatState(patch_base['json']);
    const id = patch_base.id;

    const patch = difference(
        constructValidJSON(current_state),
        constructValidJSON(base)
    );

    if (!isEmpty(patch)){
        const formattedData = Constants.PATCH_SKELETON
        Object.values(formattedData).forEach(value => {
            value[0].name=current_state.title
            value[0].patch=patch
        })
        const region = Constants.URL_TO_REGION_MAPPING[patch_base.url]
        formattedData[region][0].id = id
        const fileData = JSON.stringify(formattedData, null, 4);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const title = current_state.title.replace(/ /g, '_');
        link.download = `${title}_module_type_patch.json`;
        link.href = url;
        link.click();
        deactivatePatch();
    }
    else {
        showAlert(
            Constants.ALERT_TITLE_FOR_EMPTY_PATCH,
            Constants.ALERT_FOR_EMPTY_PATCH
        )
    }
}
