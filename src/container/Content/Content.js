import React from "react";
import { connect } from "react-redux";
import "./Content.scss";
import MarkdownEditor from "./components/MarkdownEditor";
import ExternalReferences from "./components/ExternalReferences/ExternalReferences";
import Properties from "./components/Properties/Properties";
import ConfigurationSpec from "./components/ConfigurationSpec/ConfigurationSpec";
import Capabilities from "./components/Capabilities/Capabilities";
import * as Constants from "globals/constants/constants";
import { onFileLoaded, updateFlags, updateSingleInput } from "./additionalInputsActions";
import FileInput from "./components/FileInput/FileInput";
import { addConfSpec } from "./components/ConfigurationSpec/configurationSpecActions";


class Content extends React.Component {
    changeInputHandler = event => {
        event.persist()
        this.props.updateSingleInput({
            name: event.target.name, value: event.target.value
        })
    }

    trimInputValue = event => {
        this.props.updateSingleInput({
            name: event.target.name, value: event.target.value.trim()
        })
    }

    trimFlags = event => {
        this.props.updateFlags(event.target.value.split(',').map(item=>item.trim()))
    }

    changeFlagsHandler = event => {
        event.persist()
        this.props.updateFlags(event.target.value.split(','))
    }

    handleLoadLocalFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => this.props.onFileLoaded(reader.result);
            reader.readAsDataURL(file);
        }
    }


    render() {
        return (
            <div className="content">
                <div className="row">
                    <h1 className="title">{Constants.MAIN_TITLE}</h1>
                </div>
                <form id="mainForm">
                    <div className="row">
                        <div className="column">
                            <label className="input-label">{Constants.INPUT_TITLE_LABEL}
                                <span className="required-field">*</span>
                            </label>
                            <textarea
                                required
                                autoComplete="off"
                                value={this.props.syncContent.title || '' }
                                name="title"
                                onChange={this.changeInputHandler}
                                onBlur={this.trimInputValue}
                            />
                            <label className="input-label">{Constants.DEFAULT_NAME_LABEL}
                                <span className="required-field">*</span>
                            </label>
                            <textarea required
                                      autoComplete="off"
                                      value={this.props.syncContent.default_name || ''}
                                      name="default_name"
                                      onChange={this.changeInputHandler}
                                      onBlur={this.trimInputValue}
                            />
                            <label className="input-label">{Constants.SHORT_DESCRIPTION_LABEL}</label>
                            <textarea autoComplete="off"
                                      value={this.props.syncContent.short_description || ''}
                                      name="short_description"
                                      onChange={this.changeInputHandler}
                                      onBlur={this.trimInputValue}
                            />
                            <label className="input-label">{Constants.FLAGS_LABEL}</label>
                            <input type="text"
                                   name="flags"
                                   placeholder={Constants.FLAGS_PLACEHOLDER}
                                   autoComplete="off"
                                   value={this.props.syncContent.flags || ''}
                                   onChange={this.changeFlagsHandler}
                                   onBlur={this.trimFlags}
                            />
                            <label className="input-label">{Constants.LOGO_LABEL}</label>
                            <FileInput
                                value={this.props.syncContent.logo}
                                onChange={this.handleLoadLocalFile}
                            />
                            <Properties/>
                            <Capabilities/>
                            <ExternalReferences/>
                            <ConfigurationSpec/>
                        </div>
                        <div className="column">
                            <label className="input-label">{Constants.DESCRIPTION_LABEL}</label>
                            <MarkdownEditor name="description"/>
                            <label className="input-label">{Constants.TIPS_LABEL}</label>
                            <MarkdownEditor name="tips"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    syncContent: state.other_inputs
})

const mapDispatchToProps = {
    updateSingleInput,
    updateFlags,
    onFileLoaded,
    addConfSpec
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
