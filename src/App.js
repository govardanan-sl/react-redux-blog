import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import PostDetails from './component/PostDetail/PostDetail';
import NotFound from './component/NotFound/NotFound';
import ProfileDetails from './component/ProfileDetails/ProfileDetails';
import Login from './component/Login/Login';
import Register from './component/Login/Register';
//import HomeNew from './component/Home/Home';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';
import NewProfile from './component/Profile/Profile';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { lazy, Suspense } from 'react';

const HomeNew = lazy(() => import('./component/Home/Home'/* webpackChunkName: "HomeNew" */));


function App() {
  return (
   <Router>
      <div className="App">
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar/>
          <div className="content">
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                <Suspense fallback={<div>Loading...</div>}>
                  <HomeNew/>
                </Suspense>
              </Route>
              <Route exact path="/react-blog-test-v2">
                <Suspense fallback={<div>Loading...</div>}>
                  <HomeNew/>
                </Suspense>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route exact path="/profile">
                <NewProfile/>
              </Route>
              <Route exact path="/profile/:id">
                <ProfileDetails></ProfileDetails>
              </Route>
              <Route path="/posts/:id">
                <PostDetails></PostDetails>
              </Route>
              <Route path="/old-home">
                <Home/>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </ErrorBoundary>
          </div>
          </PersistGate>
        </Provider>
      </div>
    </Router>
  );
}
export default App;
