import _ from 'lodash';

import { getAuth } from './api';

const auth = {
  async checkAuth(callback) {
    const response = await getAuth();
    const result = await response.json();
    if (_.isEmpty(result)) {
      return callback(false);
    }
    callback(true);
  }
};

export default auth;
