import React, {useContext} from "react";
import { useState } from "react";
import "./BodyReviewCreate.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useRef } from "react";
import { useEffect } from "react";
import { handleProfileFetchProtected, handleReviewFetchProtected } from "../../../../fetch/ProfileFetch.js";
import { setCurrentUserState } from "../../../../states/storeSlice/currentUserSlice.js";
import StaticClass from "../../../../static/StaticClass.js";
import { getAllReviews } from "../../../../states/storeSlice/listReviewsSlice.js";


const BodyReviewCreate = ({ClickBack}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUserSliceMode);
    const [verifyReview,setVerifyReview] = useState({
        Review: true,
    })
    const [reviewData,setReviewData] = useState({
        Review: ""
    })




    const handleInputReviewChange = (e) => {
        const { name, value } = e.target;
        if(StaticClass.regexReview.test(value))//не забудь сменить
            setVerifyReview({
                ...verifyReview,
                [name]: false
            })
        else
            setVerifyReview({
                ...verifyReview,
                [name]: true
            })
        setReviewData({
            ...reviewData,
            [name]: value
            });
    };

    const handleReviewSubmit = async (e) =>{
        e.preventDefault();
        if(!verifyReview.Review){
            try{
                
                await handleReviewFetchProtected(reviewData).then(res =>{
                    ClickBack();
                    dispatch(getAllReviews())
                })
            }
            catch(error){
                console.error(error.message);
            }
        }
    }

    



    
    return(
            <div className="container-review-create-wrapper">
                <div className="block-review-create">
                        <img className="review-create-element-icon"
                            src = {user.Photo_Client}
                            alt="user"
                            align="center"
                        />

                        <p className="review-area-header">Ваш отзыв</p>
                        <textarea name="Review" 
                                className={`${verifyReview.Review ? 'warning-review review-area' : 'review-area'}`}
                                onChange={handleInputReviewChange}
                                placeholder="Напишите отзыв"></textarea>
                        
                        <button className="create-botton-review" onClick={handleReviewSubmit}   type="button">Создать</button>
                        
                </div>

            </div>
    );   
}
export default BodyReviewCreate;