import styles from "./ExternalReferences.module.scss";
import React from "react";
import {toggleLink, updateLink} from "../../../../redux/actions";
import {connect} from "react-redux";


class PredefinedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: ""
        }
    }

    changeCheckboxHandler = (event) => {
        this.props.toggleLink(event.target.name);
        this.setState(prev => ({
            ...prev, ...{
                link: ""
            }
        }))
    }

    changeInputHandler = (event) => {
        event.persist()
        this.setState(prev => ({
            ...prev, ...{
                link: event.target.value.trim()
            }
        }))
        this.props.updateLink(
            {
                label: event.target.name,
                link: event.target.value
            }
            );
    }

    render() {
        return (
            <div className={styles.reference_wrapper}>
                <input type="checkbox" autoComplete="off" name={this.props.label}
                       onChange={this.changeCheckboxHandler}/>
                {this.props.label}
                <input
                    type="text"
                    name={this.props.label}
                    autoComplete="off"
                    value={this.state.link}
                    className={styles.predefined_input}
                    onChange={this.changeInputHandler}
                    disabled={this.props.syncReferences.filter(el =>
                        Object.values(el).includes(this.props.label)
                    ).length === 0}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    toggleLink,
    updateLink
}

const mapStateToProps = state => {
    return {
        syncReferences: state.json.external_references
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PredefinedInput);
