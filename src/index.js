import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

/** FUTURE: Put back when in production / after launch
 * registering this can lead to dev seeing old versions of platform
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */

// registerServiceWorker();
