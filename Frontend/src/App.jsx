import React from 'react'
import Header from "./component/layout/Header/Header.jsx"
import Footer from "./component/layout/footer/footer.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader"
 import Home from "./component/Home/Home.jsx"

const App = () => {
  React.useEffect(()=>
  {
WebFont.load(
  {
    google:{
      families:["Roboto","Droid sans","chilanka"]
    }
  }
)
  },[])
  return (
      <Router>
        <Header/>
        <Routes>
        <Route path='/' element={<Home />}/>
        </Routes>

        <Footer/>

      </Router>
  

  )
}

export default App
