import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Result } from './pages/Result'
import { Favorites } from './pages/Favorites'
import { ToDoList } from './pages/ToDoList'

import './css/App.css'

const App = () => {
  return (
    <div className="app_weather">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/weather" component={Home} />
        <Route path="/weather/:city" component={Result} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/todo" component={ToDoList} />
      </BrowserRouter>
    </div>
  )
}

export default App
