import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/home"
import Signin from "./Pages/signin"
import Signup from "./Pages/signup"
import About from "./Pages/about"
import Header from "./Components/header"
import PrivateRoute from "./Components/privateRoute"
import { Dashboard } from "./Pages/dashboard"
import UpdateListing from "./Pages/updateListing.jsx"
import PropertyId from "./Pages/propertyId.jsx"
import Search from "./Pages/search.jsx"
import Faq from "./Pages/faq.jsx"
import Footer from "./Components/footer.jsx"

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/sign-in" element={<Signin/>}></Route>
      <Route path="/sign-up" element={<Signup/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/faq" element={<Faq/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/propertyId/:id" element={<PropertyId/>}></Route>

      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/update-listing/:id' element={<UpdateListing/>}></Route>
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
