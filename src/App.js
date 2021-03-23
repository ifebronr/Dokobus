import Header from './components/Header'
import Maps from './components/Maps'
import Admin from './components/Admin/Admin'
import Login from './components/Login'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import SignUp from './components/SignUp'
import { useEffect, useState } from 'react'
import firebase from './components/firebase'
function App() {
  
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
  });
  
    return firebaseInitialized !== false ? (
      <div className="App">
        <Router>
          <Switch> 
            <Route exact path = "/" >
              <Header id = "cd-header" />
              <Maps width = "100%" height = "100vh" />
            </Route>
            <Route  path = {`/admin`} >
              <Admin />
            </Route>
            <Route exact path = '/login' >
              <Login />
            </Route>
            <Route exact path = '/register' >
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </div>
    ): <h1>Loading......</h1>;
}

export default App;
