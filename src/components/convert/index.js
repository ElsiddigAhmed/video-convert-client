import React, { useState } from 'react';
import Convert from "./common/convert.js"

export default function Converted() {
    const [file, setFile] = useState(' ');
    const onChangeFile = e => {
        setFile([...file, e.target.files[0]])
    }

    const selectElement = (element) => document.querySelector(element);

    const add = () => {
        selectElement('.file-drop-area').classList.add('is-active');
    }
    const removed = () => {
        selectElement('.file-drop-area').classList.remove('is-active');
    }

    return (
        <Convert
            removed={removed}
            add={add}
            change={onChangeFile}
        />
    )


}