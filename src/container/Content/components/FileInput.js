import React from "react";
import "./FileInput.scss"

const FileInput = ({value, onChange, ...rest}) => (
    <div className='img-wrapper'>
        <input type="file" onChange={onChange} className="img-upload" {...rest}/>
        <div className="drag">
            {Boolean(value) && (
                <div className="img">
                    <div>Selected file:</div>
                    <img src={value} alt="" width="50"/>
                </div>
            )}
        </div>
    </div>
);

export default FileInput;