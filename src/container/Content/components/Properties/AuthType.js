import React from "react";
import styles from "./Properties.module.scss";
import * as Constants from "../../../../globals/constants/constants";
import { toggleAuthType } from "../../../../redux/actions";
import { connect } from "react-redux";


class AuthType extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            auth_type_options: ["authorization-header", "basic", "bearer"],
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
            <select className={styles.selectAuth}
                    defaultValue={"DEFAULT"}
                    disabled={!Object.keys(this.props.syncProperties).includes("auth-type")}>
                <option value="DEFAULT" disabled hidden>{Constants.SELECT_PLACEHOLDER}</option>
                {
                   this.state.auth_type_options.map(
                        option => {
                            return <option>{option}</option>
                        }
                    )
                }
            </select>
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
