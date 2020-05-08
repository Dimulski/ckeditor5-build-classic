/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

// Additional Plugins
import { GraphQLUploadAdapter } from './graphQLUploadAdapter.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Font from '@ckeditor/ckeditor5-font/src/font';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	TextTransformation,
	GraphQLUploadAdapter,
	ImageResize,
	Alignment,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	RemoveFormat,
	IndentBlock,
	Font
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		viewportTopOffset: 52,
		items: [
			'heading',
			'|',
			'fontSize',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'alignment:left',
			'alignment:center',
			'alignment:right',
			'alignment:justify',
			'|',
			'indent',
			'outdent',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'link',
			'imageUpload',
			'blockQuote',
			'mediaEmbed',
			'removeFormat',
			'subscript',
			'superscript',
			'undo',
			'redo'
		]
	},
	heading: {
		options: [
			{
				model: 'paragraphDTable',
				view: {
					name: 'p',
					classes: 'd-table'
				},
				title: 'Paragraph',
				class: 'ck-heading_paragraph',
				converterPriority: 'high'
			},
			{
				model: 'paragraph',
				view: {
					name: 'p'
				},
				title: 'Wrapped Paragraph (Images)',
				class: 'ck-heading_paragraph'
			},
			{ model: 'heading1', view: { name: 'h1', classes: 'd-table' }, title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: { name: 'h2', classes: 'd-table' }, title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: { name: 'h3', classes: 'd-table' }, title: 'Heading 3', class: 'ck-heading_heading3' }
		]
	},
	image: {
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:full',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative'
		],
		styles: [
			{ name: 'alignLeft', title: 'Left aligned image', icon: 'left',
				className: [ 'image-style-align-left', 'float-left', 'mr-lg-5', 'mb-2', 'mb-lg-3' ] },
			{ name: 'full', title: 'Center aligned image', className: [ 'mb-2', 'mb-lg-3' ] },
			{ name: 'alignRight', title: 'Right aligned image', icon: 'right',
				className: [ 'image-style-align-right', 'float-right', 'ml-lg-5', 'mb-2', 'mb-lg-3' ] }
		]
	},
	indentBlock: {
		offset: 1,
		unit: 'em'
	},
	fontSize: {
		options: [
			'tiny',
			'small',
			'default',
			'big',
			'huge'
		]
	},
	link: {
		addTargetToExternalLinks: true
	},
	mediaEmbed: {
		previewsInData: true,
		removeProviders: [ 'instagram', 'twitter', 'googleMaps', 'flickr', 'facebook' ]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
