import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { updateSingleInput } from "container/Content/otherInputsActions";
import { connect } from "react-redux";


class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            tab: "write",
            name: this.props.name
        };
    };
    handleValueChange = value => {
        this.setState({ value });
        this.props.updateSingleInput({name: this.state.name, value: value})
    };

    handleTabChange = tab => {
        this.setState({ tab });
    };

    render() {
        return  <ReactMde
            maxEditorHeight="189"
            maxPreviewHeight="189"
            toolbarCommands={
                [
                    ["header"],["bold"], ["italic"], ["strikethrough"],
                    ["link"], ["quote"], ["code"], ["ordered-list"],
                    ["unordered-list"], ["checked-list"]
                ]
            }
            onChange={this.handleValueChange}
            onTabChange={this.handleTabChange}
            value={this.state.value}
            generateMarkdownPreview={(markdown) =>
                Promise.resolve(<ReactMarkdown source={markdown} />)
            }
            selectedTab={this.state.tab}
        />
    }
}


const mapDispatchToProps = {
    updateSingleInput
}

export default connect(null, mapDispatchToProps)(MarkdownEditor);
