import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
 
class TextEditor extends Component {
 
    render() {
        return (
            <Editor />
        );
    }
}


export default TextEditor;