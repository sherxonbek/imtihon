import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./users/components/Layout"
import LayoutAdmin from "./admin/components/LayoutAdmin"
import Home from "./users/pages/Home"
import Addprodact from "./admin/pages/Addprodact"
import Dashboard from "./admin/pages/Dashboard"
import Statistike from "./admin/pages/Statistike"
import Addbanners from "./admin/pages/Addbanners"
import Cart from "./users/pages/Cart"


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/admin" element={<LayoutAdmin />} >
            <Route index element={<Dashboard />} />
            <Route path="addprodact" element={<Addprodact />} />
            <Route path="statistika" element={<Statistike />} />
            <Route path="addbanners" element={<Addbanners />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
