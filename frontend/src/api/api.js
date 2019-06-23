const rp = require('request-promise');

export class Api {
  constructor() {
    this.endpoint = process.env.REACT_APP_API || 'http://localhost:3000';
  }

  async sendRequest(options) {
    options.uri = `${this.endpoint}/${options.uri}`;
    if (options.json === undefined) {
      options.json = true;
    }
    return await rp(options);
  }

  getUrl(uri) {
    return `${this.endpoint}/${uri}`;
  }
}
