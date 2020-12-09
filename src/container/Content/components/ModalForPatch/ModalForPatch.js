import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Icons from "globals/icons/sprite.svg";
import *  as Constants from "globals/constants/constants"
import Loader from "react-loader";
import { patchModuleTypeRequest } from "rootActions";
import { hideModalForPatch, showAlert } from "../visibilityActions";
import { connect } from "react-redux";


const ModalForPatch = (props) => (
    <div className='modal' id='modal'>
        <Formik
            initialValues={{ client_id: '', password: '', module_type_id: '', iroh_service_url: '' }}
            validate={ values =>
                Object.fromEntries(
                    Object.entries(values)
                        .filter(([ key, val ]) => !val)
                        .map(([ key, val ]) => [key, 'is required'])
                )
            }
            onSubmit={ async (values, { setSubmitting }) => {
                props.patchModuleTypeRequest(
                    values.module_type_id,
                    values.client_id,
                    values.password,
                    values.iroh_service_url
                )
                setSubmitting(false)
            }}
        >

            {({ isSubmitting }) => (
                props.loader ?
                    <Loader loaded={false} className="spinner" />
                    : <Form className="modal-content">
                        <svg className="closeIcon" onClick={props.hideModalForPatch}>
                            <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                        </svg>

                        <p className="push-modal-text">
                            { Constants.PATCH_MODAL_TEXT }
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
                        <label htmlFor="module_type_id" className="centered">
                            { Constants.MODULE_TYPE_ID }
                        </label>
                        <div>
                            <Field name="module_type_id" type="module_type_id" id="module_type_id" required/>
                            <ErrorMessage name="module_type_id" component="div" className='error'/>
                        </div>
                        <label htmlFor="iroh_service_url" className="centered">
                            { Constants.REGION_LABEL }
                        </label>
                        <div>
                            <Field as="select" name="iroh_service_url" required>
                                <option value="" disabled hidden>
                                    { Constants.SELECT_PLACEHOLDER }
                                </option>
                                <option value={ Constants.IROH_SERVICES_URLS.Europe }>
                                    { Constants.EUROPE }
                                </option>
                                <option value={ Constants.IROH_SERVICES_URLS["North America"] }>
                                    { Constants.NORTH_AMERICA }
                                </option>
                                <option value={ Constants.IROH_SERVICES_URLS.Asia }>
                                    { Constants.ASIA }
                                </option>
                            </Field>
                            <ErrorMessage name="iroh_service_url" component="div" className='error'/>
                        </div>
                        <div className="controls">
                            <button type="button" onClick={props.hideModalForPatch} className="cancel">
                                { Constants.CANCEL_BTN_TITLE }
                            </button>
                            <button type="submit" disabled={isSubmitting} className="submit">
                                { Constants.PULL_BTN_TITLE }
                            </button>
                        </div>
                    </Form>
            )}
        </Formik>
    </div>
);

const mapStateToProps = (state) => ({
    loader: state.elements_visibility.loader
})

const mapDispatchToProps = {
    hideModalForPatch,
    showAlert,
    patchModuleTypeRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForPatch);
