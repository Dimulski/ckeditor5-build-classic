/**
 * 
 * This upload adapter is based on the SimpleUploadAdapter provided by CKEditor.
 * 
 */

export function GraphQLUploadAdapter(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    const options = editor.config.get('graphQLUploadAdapter');
    return new GraphQLAdapter(loader, options);
  };
}

class GraphQLAdapter {
  constructor(loader, options) {
    this.loader = loader;
    this.options = options;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', this.options.graphQLUrl, true);
    xhr.responseType = 'json';
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response.data.resize
      if (!response || response.errors.length > 0) {
        return reject(response.errors[0] ? genericErrorText + '\n' + response.errors[0] : genericErrorText);
      } else {
        resolve({ default: response.data.url }); 
      }
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file) {
    this.xhr.setRequestHeader('Authorization', `Bearer ${this.options.authToken}`)
    const data = new FormData();
    data.append('operations', `{
			"query":"mutation($file: Upload!) { resize(file: $file) { errors data { url width height } }}",
			"variables":{
			   "file":null
			}
		 }`)
    data.append('map', '{"0":["variables.file"]}')
    data.append('0', file)
    this.xhr.send(data);
  }
}
