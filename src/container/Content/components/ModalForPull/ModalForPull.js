import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Icons from "globals/icons/sprite.svg";
import './ModalForPull.scss';
import *  as Constants from "globals/constants/constants"
import Loader from "react-loader"
import { connect } from "react-redux";
import { pullModuleTypeRequest } from "rootActions";
import { hideModalForPull } from "../visibilityActions";


const ModalForPull = (props) => (
    <div className='modal' id='modal'>
        <Formik
            initialValues={{ client_id: '', password: '', module_type_id: '' }}
            validate={values => {
                const errors = {};
                if (!values.client_id) {
                    errors.client_id = 'is required';
                }
                if (!values.password) {
                    errors.password = 'is required';
                }
                if (!values.module_type_id) {
                    errors.module_type_id = 'is required';
                }
                return errors;
            }}
            onSubmit={ async (values, { setSubmitting }) => {
                props.pullModuleTypeRequest(values.module_type_id, values.client_id, values.password)
                setSubmitting(false)
            }}
        >

            {({ isSubmitting }) => (
                props.loader ?
                    <Loader loaded={false} className="spinner" />
                   : <Form className="modal-content">
                        <svg className="closeIcon" onClick={props.hideModalForPull}>
                            <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                        </svg>

                        <p className="push-modal-text">
                            { Constants.PULL_MODAL_TEXT }
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
                        <div className="controls">
                            <button type="button" onClick={props.hideModalForPull} className="cancel">
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
    pullModuleTypeRequest,
    hideModalForPull
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForPull);
