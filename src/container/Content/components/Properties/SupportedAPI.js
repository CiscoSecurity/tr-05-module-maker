import React from "react";
import styles from "./Properties.module.scss";
import { connect } from "react-redux";
import { addCapability, deleteCapability, updateSupportedAPI } from "../../../../redux/actions";


class SupportedAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.api.title,
            class: this.props.api.class
        }
    }

    changeHandler = (event) => {
        this.props.updateSupportedAPI(this.state.title);

        if (event.target.checked) {
        this.props.addCapability(this.state.class);
        }
        else {
        this.props.deleteCapability(this.state.class);
        }
    }

    render() {
        return <div className={styles.supportedAPI}>
            <input type="checkbox" autoComplete="off" onChange={this.changeHandler}/>
            {this.state.title}
        </div>
    }
}

const mapDispatchToProps = {
    addCapability,
    deleteCapability,
    updateSupportedAPI
}

export default connect(null, mapDispatchToProps)(SupportedAPI);
