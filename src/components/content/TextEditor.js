import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
 
class TextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }
    
    
    onEditorStateChange = (editorState) => {
    this.setState({
        editorState,
    }, () => this.props.handleChange(convertToRaw(editorState.getCurrentContent())));
    };
    
 
    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'list', 'link', 'emoji'],
                    inline: { options: ['bold', 'italic', 'underline']},
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { inDropdown: false },
                    link: { inDropdown: false },
                    history: { inDropdown: false },
                }}
            />
        );
    }
}


export default TextEditor;