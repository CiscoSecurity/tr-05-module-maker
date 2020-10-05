import React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { updateSingleInput } from "../../../redux/actions";
import { connect } from "react-redux";


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

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
            generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
            }
            selectedTab={this.state.tab}
        />
    }
}


const mapDispatchToProps = {
    updateSingleInput
}

export default connect(null, mapDispatchToProps)(MarkdownEditor);
