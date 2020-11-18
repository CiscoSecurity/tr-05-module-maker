import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Icons from "globals/icons/sprite.svg";
import './ModalForPush.scss';
import *  as Constants from "globals/constants/constants"
import Loader from "react-loader";
import { pushModuleTypeRequest } from "rootActions";
import { hideModalForPush, showAlert } from "../visibilityActions";
import { connect } from "react-redux";


const ModalForPush = (props) => (
    <div className='modal' id='modal'>
        <Formik
            initialValues={{ client_id: '', password: '', iroh_service_url: '' }}
            validate={values => {
                const errors = {};
                if (!values.client_id) {
                    errors.client_id = 'is required';
                }
                if (!values.password) {
                    errors.password = 'is required';
                }
                if (!values.iroh_service_url) {
                    errors.iroh_service_url = 'is required';
                }
                return errors;
            }}
            onSubmit={ async (values, { setSubmitting }) => {
                props.pushModuleTypeRequest(props.json, values)
                setSubmitting(false);
            }}
        >

            {({ isSubmitting }) => (
                props.loader?
                    <Loader loaded={false} className="spinner" />
                : <Form className="modal-content">
                    <svg className="closeIcon" onClick={props.hideModalForPush}>
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
                    <label htmlFor="iroh_service_url" className="centered">
                        { Constants.REGION_LABEL }
                    </label>
                    <div>
                        <Field as="select" name="iroh_service_url" required>
                          <option value="" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                          <option value={ Constants.IROH_SERVICES_URLS.Europe }>Europe</option>
                          <option value={ Constants.IROH_SERVICES_URLS["North America"] }>North America</option>
                          <option value={ Constants.IROH_SERVICES_URLS.Asia }>Asia</option>
                        </Field>
                      <ErrorMessage name="iroh_service_url" component="div" className='error'/>
                    </div>
                    <div className="controls">
                        <button type="button" onClick={props.hideModalForPush} className="cancel">
                            { Constants.CANCEL_BTN_TITLE }
                        </button>
                        <button type="submit" disabled={isSubmitting} className="submit">
                            { Constants.PUSH_BTN_TITLE }
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
    hideModalForPush,
    showAlert,
    pushModuleTypeRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForPush);
