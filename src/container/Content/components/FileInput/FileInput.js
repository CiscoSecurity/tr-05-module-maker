import React from "react";
import "./FileInput.scss"
import Icons from "globals/icons/sprite.svg";
import { deleteLogo } from "../../otherInputsActions";
import { connect } from "react-redux";

const FileInput = ({ value, onChange, deleteLogo }) => (
    <div className='imgWrapper'>
        <input type="file" onChange={onChange} className="imgUpload"/>
        { Boolean(value) &&
        (<div>
                <img src={value} alt="" width="50" className="img"/>
                <svg className="closeIcon" onClick={deleteLogo}>
                    <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                </svg>
            </div>)
        }
    </div>
);

const mapDispatchToProps = {
    deleteLogo
}

export default connect(null, mapDispatchToProps)(FileInput);
