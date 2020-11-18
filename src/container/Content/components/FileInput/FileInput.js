import React, { useCallback } from "react";
import "./FileInput.scss"
import Icons from "globals/icons/sprite.svg";
import { deleteLogo, onFileLoaded } from "../../additionalInputsActions";
import { connect } from "react-redux";
import { useDropzone } from 'react-dropzone'


const FileInput = ({ value, deleteLogo, onFileLoaded }) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const dataURL = reader.result
                onFileLoaded(dataURL)
            }
            reader.readAsDataURL(file)
        }

    }, [onFileLoaded])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, multiple: false, accept: "image/*"
    })

    return (
        <div className="dropzone-wrapper">
            <div {...getRootProps({className: `dropzone${isDragActive ? '-active' : ''}`})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop your logo here, or click to select logo</p>
            </div>
            {Boolean(value) &&
            (<div>
                <img src={value} alt="" height="60" className="img"/>
                <svg className="closeIcon" onClick={deleteLogo}>
                    <use xlinkHref={`${Icons}#icon-small-x-close`}/>
                </svg>
            </div>)
            }
        </div>
    )
}


const mapDispatchToProps = {
    deleteLogo,
    onFileLoaded
}

export default connect(null, mapDispatchToProps)(FileInput);
