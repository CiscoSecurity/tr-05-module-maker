import React from "react";
import {connect} from "react-redux";
import styles from "./Content.module.scss";
import MarkdownEditor from "./components/MarkdownEditor";
import ExternalReferences from "./components/ExternalReferences/ExternalReferences";
import Properties from "./components/Properties/Properties";
import ConfigurationSpec from "./components/ConfigurationSpec/ConfigurationSpec";
import Capabilities from "./components/Capabilities/Capabilities";
import * as Constants from "../../globals/constants/constants";
import {updateSingleInput, updateFlags, onFileLoaded} from "../../redux/actions";


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "default_name": "",
            "short_description": "",
            "flags": "",
            "logo": "",
        };
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
            [event.target.name] : event.target.value
            }}))
        this.props.updateSingleInput({name:event.target.name, value: event.target.value.trim()})
    }

    changeFlagsHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
                [event.target.name] : event.target.value.trim()
            }}))
        this.props.updateFlags(event.target.value.split(','))
    }

    handleLoadLocalFile = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => this.props.onFileLoaded(reader.result);
        reader.readAsDataURL(file);
    }

    render() {
        return <div className={styles.content}>
            <div className={styles.row}>
                <h1 className={styles.header}>{Constants.MAIN_TITLE}</h1>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p>{Constants.INPUT_TITLE_LABEL}</p>
                    <textarea
                        required
                        autoComplete="off"
                        value={this.state.title}
                        name="title"
                        onChange={this.changeInputHandler}
                    />
                    <p>{Constants.DEFAULT_NAME_LABEL}</p>
                    <textarea required
                              autoComplete="off"
                              value={this.state.default_name}
                              name="default_name"
                              onChange={this.changeInputHandler}/>
                    <p>{Constants.SHORT_DESCRIPTION_LABEL}</p>
                    <textarea autoComplete="off"
                              value={this.state.short_description}
                              name="short_description"
                              onChange={this.changeInputHandler}/>
                    <Properties/>
                    <Capabilities/>
                </div>
                <div className={styles.column}>
                    <p>{Constants.DESCRIPTION_LABEL}</p>
                        <MarkdownEditor name="description"/>
                    <p>{Constants.TIPS_LABEL}</p>
                        <MarkdownEditor name="tips"/>
                    <ExternalReferences/>
                    <p>{Constants.FLAGS_LABEL}</p>
                    <input type="text"
                           name="flags"
                           placeholder={Constants.FLAGS_PLACEHOLDER}
                           autoComplete="off"
                           value={this.state.flags}
                           onChange={this.changeFlagsHandler}/>
                    <p>{Constants.LOGO_LABEL}</p>
                    <input type="file" accept="image/*" name="logo"
                           autoComplete="off" onChange={this.handleLoadLocalFile}/>
                </div>
            </div>
                <ConfigurationSpec/>
        </div>
    }
}

const mapDispatchToProps = {
    updateSingleInput,
    updateFlags,
    onFileLoaded
}

export default connect(null, mapDispatchToProps)(Content);
