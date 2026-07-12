import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./users/components/Layout"
import LayoutAdmin from "./admin/components/LayoutAdmin"
import Home from "./users/pages/Home"
import Addprodact from "./admin/pages/Addprodact"
import Dashboard from "./admin/pages/Dashboard"
import Statistike from "./admin/pages/Statistike"
import Addbanners from "./admin/pages/Addbanners"
import Cart from "./users/pages/Cart"
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"
import ProdactsManage from "./admin/pages/ProdactsManage"
import LayoutManage from "./admin/components/LayoutManage"
import Manage from "./admin/pages/Manage"


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />



          <Route path="/admin" element={<LayoutAdmin />} >
            <Route index element={<Dashboard />} />
            <Route path="addprodact" element={<Addprodact />} />
            <Route path="statistika" element={<Statistike />} />
            <Route path="addbanners" element={<Addbanners />} />

            <Route path="product-management" element={<LayoutManage />} >
              <Route index element={<ProdactsManage />} />
              <Route path="banner-manage" element={<Manage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
