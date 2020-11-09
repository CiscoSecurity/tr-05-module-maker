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
