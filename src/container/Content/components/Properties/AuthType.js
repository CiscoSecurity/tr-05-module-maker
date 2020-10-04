import React from "react";
import styles from "./Properties.module.scss";
import * as Constants from "../../../../globals/constants";
import { toggleAuthType } from "../../../../redux/actions";
import { connect } from "react-redux";
import Select from 'react-select';


class AuthType extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            auth_type_options: [
                {label: 'authorization-header', value: 'authorization-header'},
                {label: 'basic', value: 'basic'},
                {label: 'bearer', value: 'bearer'}
                ]
        }
    }

render() {
    return (
        <div className={styles.divAuth}>

            <input type="checkbox"
                   autoComplete="off"
                   onClick={this.props.toggleAuthType}
            />

            <label>authorization</label>
            <Select
                className={styles.selectAuth}
                placeholder={Constants.SELECT_PLACEHOLDER}
                isClearable="true"
                options={this.state.auth_type_options}
                isDisabled={!Object.keys(this.props.syncProperties).includes("auth-type")}
            >
            </Select>
        </div>
    )
}
}

const mapDispatchToProps = {
    toggleAuthType
}

const mapStateToProps = state => {
    return {
        syncProperties: state.json.properties
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthType);
