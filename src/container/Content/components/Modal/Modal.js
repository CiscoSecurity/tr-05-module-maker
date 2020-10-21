import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Icons from "globals/icons/sprite.svg";
import './Modal.scss';
import *  as Constants from "globals/constants/constants"


async function authorize(values) {
    const response =  await fetch(Constants.URL + Constants.AUTH_ENDPOINT,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(values.client_id + ':' + values.password)
            },
            body: 'grant_type=client_credentials'
        }
    )
    if (response.ok === false) {
        alert('Error: ' + (response.statusText || 'Authorization failed'))
    }
    const data = await response.json();
    return data['access_token'];
}

async function push(values, json) {
    const token = await authorize(values);
    if (token) {
        const response = await fetch(Constants.URL + Constants.MODULE_TYPE_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
                "body": JSON.stringify(json)
            }
        )
        const data = await response.json();
        if (response.ok === false || data["error"]) {
            alert("Error: " + response.statusText || data["error_description"])
        }
        else {
            alert(Constants.MESSAGE_SUCCESS + data['id'])
            const modal = document.getElementById("modal");
            modal.style.display = "none";
        }
    }
}


function hideModal () {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

const Modal = (props) => (
    <div className='modal' id='modal'>
        <Formik
            initialValues={{ client_id: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.client_id) {
                    errors.client_id = 'is required';
                }
                if (!values.password) {
                    errors.password = 'is required';
                }
                return errors;
            }}
            onSubmit={ async (values, { setSubmitting }) => {
                await push(values, props.json)
                setSubmitting(false)
            }}
        >

            {({ isSubmitting }) => (
                <Form className="modal-content">
                    <svg className="closeIcon" onClick={ hideModal }>
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>

                    <p className="push-modal-text">
                        { Constants.PUSH_MODAL_TEXT }
                    </p>
                    <label htmlFor="client_id" className="centered">
                        { Constants.CLIENT_ID_LABEL }
                    </label>
                    <div>
                        <Field type="text" name="client_id" id="client_id" required/>
                        <ErrorMessage name="client_id" component="div" className='error'/>
                    </div>
                    <label htmlFor="password" className="centered">
                        { Constants.CLIENT_PASSWORD_LABEL }
                    </label>
                    <div>
                        <Field name="password" type="password" id="password" required/>
                        <ErrorMessage name="password" component="div" className='error'/>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            { Constants.PUSH_BTN_TITLE }
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>

);

export default Modal;

