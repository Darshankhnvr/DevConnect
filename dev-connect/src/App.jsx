import {BrowserRouter as Router , Route ,Routes} from "react-router-dom"
import './App.css'
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/Home"
import Feed from "./pages/feed"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {


  return (
    <>
    <Router>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route
    path="/feed"
    element={
      <ProtectedRoute>
        <Feed/>
      </ProtectedRoute>
    }
  />
</Routes>

    </Router>

    </>
  )
}

export default App
