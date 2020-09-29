import React from 'react';
import { Provider } from 'react-redux'
import URLBookmarkManager from './URL-Bookmark-Manager/Views/URLBookmarkManager'
import { createStore } from 'redux'
import reducer from './URL-Bookmark-Manager/StateManagement/store.js'
const store = createStore(reducer)
function App() {
  return (
    <div>
      <Provider store={store}>
        <URLBookmarkManager />
      </Provider>
    </div>
  );
}

export default App;
