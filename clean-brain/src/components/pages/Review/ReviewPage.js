import React, { useState } from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import BodyReview from "../../elements/Body/BodyReview/BodyReview";
import '../Home/HomePage.css'

const ReviewPage = () => {
        return(         
            <div className="container-page">
                <Header/>
                <BodyReview/>
                <Footer/>
            </div>
    )
}

export default ReviewPage;