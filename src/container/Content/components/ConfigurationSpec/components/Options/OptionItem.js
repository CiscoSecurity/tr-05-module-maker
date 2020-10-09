import React from "react";
import  "./Options.scss"; //ToDo
import Icons from "globals/icons/sprite.svg";
import {connect} from "react-redux";
import {deleteOption} from "redux/actions";


class OptionsItem extends React.Component {
    onDeleteIconClick = () => {
        this.props.deleteOption(this.props.option_id, this.props.conf_spec_id)
    }

    render() {
        return (
            <div className="optionsWrapper">
                <div className="optionsIconWrapper">
                    <svg className="closeIcon" onClick={this.onDeleteIconClick}>
                        <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                    </svg>
                </div>
                <div className="inputDiv">
                    value
                    <input type="text" name="option" className="customInput"/>
                </div>
                <div className="inputDiv">
                    label
                    <input type="text" name="option" className="customInput"/>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = {
    deleteOption,
}

export default connect(null, mapDispatchToProps)(OptionsItem);