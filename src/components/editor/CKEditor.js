import React from 'react';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';     // <--- ADDED
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';


import MyUploadAdapter from './MyUploadAdapter'

import './ckeditor.css'
function MWEditor({ mode, content, setContent }) {
    // console.log('mode', mode)
    const _onChange = (event, editor) => {
        setContent(editor.getData())
    }

    const _onBlur = (event, editor) => {
        console.log('Blur.');
    }

    const _onFocus = (event, editor) => {
        console.log('_onFocus.');
    }
    const _init = (editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!');
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }
    // console.log('mode > ', mode, mode ? 1 : 2)
    // const defaultToolbar = mode ? ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'imageUpload', 'insertTable', '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'link', 'blockQuote', '|', 'undo', 'redo', 'highlight'] : [];
    const editorConfig = {
        plugins: [Essentials, Highlight, Table, TableToolbar, Link, Paragraph, Alignment, Heading, Image, Bold, ImageResize, Italic, ImageUpload, ImageToolbar, ImageStyle, ImageCaption, BlockQuote, List],
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'imageUpload', 'insertTable', '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'link', 'blockQuote', '|', 'undo', 'redo', 'highlight'],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        },
        ckfinder: {
            uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
          },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },

        image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
            resizeUnit: '%',
            styles: [
                // This option is equal to a situation where no style is applied.
                'full',
                // This represents an image aligned to the left.
                'alignLeft',
                // This represents an image aligned to the right.
                'alignRight'
            ]

        },
        alignment: {
            options: ['left', 'right', 'center', 'justify']
        },
        highlight: {
            options: [
                {
                    model: 'redPen',
                    class: 'pen-red',
                    title: 'Red pen',
                    color: 'var(--ck-highlight-pen-red)',
                    type: 'pen'
                },
                {
                    model: 'greenPen',
                    class: 'pen-green',
                    title: 'Green pen',
                    color: 'var(--ck-highlight-pen-green)',
                    type: 'pen'
                },
                {
                    model: 'yellowMarker',
                    class: 'marker-yellow',
                    title: 'Yellow marker',
                    color: 'var(--ck-highlight-marker-yellow)',
                    type: 'marker'
                },
                {
                    model: 'greenMarker',
                    class: 'marker-green',
                    title: 'Green marker',
                    color: 'var(--ck-highlight-marker-green)',
                    type: 'marker'
                },
                {
                    model: 'pinkMarker',
                    class: 'marker-pink',
                    title: 'Pink marker',
                    color: 'var(--ck-highlight-marker-pink)',
                    type: 'marker'
                },
                {
                    model: 'blueMarker',
                    class: 'marker-blue',
                    title: 'Blue marker',
                    color: 'var(--ck-highlight-marker-blue)',
                    type: 'marker'
                },
            ]
        },

    }
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={content}
            onInit={_init}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            // disabled={!mode} //readOnly
        />
    )
}

export default MWEditor
