import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Icons from "globals/icons/sprite.svg";
import './Modal.scss';
import *  as Constants from "globals/constants/constants"
import pushModuleType from "services"


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
                await pushModuleType(
                    values,
                    props.json,
                    props.alertHandler
                );
                setSubmitting(false);
            }}
        >

            {({ isSubmitting }) => (
                <Form className="modal-content">
                    <svg className="closeIcon" onClick={props.closeModalHandler}>
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
                        <button type="submit" disabled={isSubmitting} className="submit">
                            { Constants.PUSH_BTN_TITLE }
                        </button>
                        <button type="button" onClick={props.closeModalHandler} className="cancel">
                            { Constants.CANCEL_BTN_TITLE }
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default Modal;
