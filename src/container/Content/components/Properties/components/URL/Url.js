import React from "react";
import * as Constants from "globals/constants/constants";
import { toggleUrl, updateUrl } from "../../propertiesActions";
import { connect } from "react-redux";
import "./Url.scss";


class Url extends React.Component {
    onCheckboxToggle = () => {
        this.props.toggleUrl();
    }

    onUrlChange = event => {
        event.persist();
        this.props.updateUrl(event.target.value)
    }

    trimInputValue = event => {
        this.props.updateUrl(event.target.value.trim())
    }

    render() {
        return (
            <div>
                <div className="divUrl">

                    <input type="checkbox"
                           autoComplete="off"
                           onChange={this.onCheckboxToggle}
                           checked={Object.keys(this.props.syncProperties).includes("url")}
                    />

                    <label> { Constants.URL_LABEL } </label>

                    <input  type="text"
                            value={this.props.syncProperties["url"] || ""}
                            onChange={this.onUrlChange}
                            disabled={!Object.keys(this.props.syncProperties).includes("url")}
                            onBlur={this.trimInputValue}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    toggleUrl,
    updateUrl
}

const mapStateToProps = (state) => ({
    syncProperties: state.properties
})

export default connect(mapStateToProps, mapDispatchToProps)(Url);
