import React from 'react'
import playStoreImage from "../../../images/images.png";
import appstore from "../../../images/appstore.png"
import "./footer.css"
function footer() {
  return (
    <footer id='footer'>
        <div className="leftfooter">
            <h4>DOWNLOAD OUR AP4</h4>
            <p>Download app for Android and IOS mobile phone</p>
           <img src={playStoreImage} alt="Play Store " />
           <img src={appstore} alt="app store" />
        </div>
        
        
        <div className="midfooter">

            <h1>E-commerce</h1>
            <p>High quality our first priority</p>
            <p>copyrights &copy; Sagarkhare</p>
        </div>

        <div className="rightfooter">
            <h4>Follow us</h4>
            <a href="https://github.com/trusagarkhare-creator">github</a>
            <a href="https://www.youtube.com/@sagarkhare-eg4gq">youtube</a>
        </div>
      
    </footer>
  )
}

export default footer
