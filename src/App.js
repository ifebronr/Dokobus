import Header from './components/Header'
import Maps from './components/Maps'
import Admin from './components/Admin'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route exact path = "/" >
            <Header />
            <Maps />
          </Route>
          <Route exact path = "/admin" >
            <Admin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
