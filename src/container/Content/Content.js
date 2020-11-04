import React from "react";
import { connect } from "react-redux";
import "./Content.scss";
import MarkdownEditor from "./components/MarkdownEditor";
import ExternalReferences from "./components/ExternalReferences/ExternalReferences";
import Properties from "./components/Properties/Properties";
import ConfigurationSpec from "./components/ConfigurationSpec/ConfigurationSpec";
import Capabilities from "./components/Capabilities/Capabilities";
import * as Constants from "globals/constants/constants";
import { onFileLoaded, updateFlags, updateSingleInput } from "./otherInputsActions";
import FileInput from "./components/FileInput/FileInput";


class Content extends React.Component {
    changeInputHandler = event => {
        event.persist()
        this.props.updateSingleInput({name: event.target.name, value: event.target.value})
    }

    trimInputValue = event => {
        this.props.updateSingleInput({
            name: event.target.name, value: event.target.value.trim()
        })
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
                            <p>{Constants.INPUT_TITLE_LABEL}
                                <span className="requiredField">*</span>
                            </p>
                            <textarea
                                required
                                autoComplete="off"
                                value={this.props.syncContent.title || '' }
                                name="title"
                                onChange={this.changeInputHandler}
                            />
                            <p>{Constants.DEFAULT_NAME_LABEL}
                                <span className="requiredField">*</span>
                            </p>
                            <textarea required
                                      autoComplete="off"
                                      value={this.props.syncContent.default_name || ''}
                                      name="default_name"
                                      onChange={this.changeInputHandler}
                                      onBlur={this.trimInputValue}
                            />
                            <p>{Constants.SHORT_DESCRIPTION_LABEL}</p>
                            <textarea autoComplete="off"
                                      value={this.props.syncContent.short_description || ''}
                                      name="short_description"
                                      onChange={this.changeInputHandler}/>
                            <p>{Constants.FLAGS_LABEL}</p>
                            <input type="text"
                                   name="flags"
                                   placeholder={Constants.FLAGS_PLACEHOLDER}
                                   autoComplete="off"
                                   value={this.props.syncContent.flags || ''}
                                   onChange={this.changeFlagsHandler}/>
                            <Properties/>
                            <Capabilities/>
                        </div>
                        <div className="column">
                            <p>{Constants.DESCRIPTION_LABEL}</p>
                            <MarkdownEditor name="description"/>
                            <p>{Constants.TIPS_LABEL}</p>
                            <MarkdownEditor name="tips"/>
                            <ExternalReferences/>
                            <p>{Constants.LOGO_LABEL}</p>
                            <FileInput
                                value={this.props.syncContent.logo}
                                onChange={this.handleLoadLocalFile}
                            />
                        </div>
                    </div>
                    <ConfigurationSpec/>
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
    onFileLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
