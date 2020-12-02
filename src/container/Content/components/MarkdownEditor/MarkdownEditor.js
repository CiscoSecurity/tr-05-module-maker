import React from "react";
import ReactMde, { commands } from "react-mde";
import ReactMarkdown from "react-markdown";
import "./MarkdownEditor.scss";
import { updateSingleInput } from "container/Content/additionalInputsActions";
import { connect } from "react-redux";


class MarkdownEditor extends React.Component {
    state = {
            value: "",
            tab: "write",
            name: this.props.name
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
            minEditorHeight={323}
            minPreviewHeight={323}
            maxEditorHeight={646}
            commands={[
                {
                    commands: [
                        commands.headerCommand,
                        commands.boldCommand,
                        commands.italicCommand,
                        commands.strikeThroughCommand,
                        commands.linkCommand,
                        commands.quoteCommand,
                        commands.codeCommand,
                        commands.orderedListCommand,
                        commands.unorderedListCommand,
                        commands.checkedListCommand
                    ]
                }
            ]}
            onChange={this.handleValueChange}
            onTabChange={this.handleTabChange}
            value={this.props.syncContent[`${this.props.name}`]}
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

const mapStateToProps = (state) => ({
    syncContent: state.other_inputs
})


export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
