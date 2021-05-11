import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Create from './component/Create';
import PostDetails from './component/PostDetail/PostDetail';
import NotFound from './component/NotFound/NotFound';
import ProfileDetails from './component/ProfileDetails/ProfileDetails';
import Login from './component/Login/Login';
import Register from './component/Login/Register';
import HomeNew from './component/Home/Home';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';
import NewProfile from './component/Profile/Profile';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
   <Router>
      <div className="App">
        <Provider store={store}>
          <Navbar/>
          <div className="content">
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                <HomeNew/>
              </Route>
              <Route exact path="/react-blog-test-v2">
                <HomeNew/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="/create">
                <Create></Create>
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
        </Provider>
      </div>
    </Router>
  );
}
export default App;
