import {React, useState, useEffect} from "react";
import "./CardReview.css"
import userIcon from "../../../../images/example.jpg"
import { useDispatch, useSelector } from "react-redux";
import closeBotton from "../../../../images/closeBotton.png"
import { setPopupState } from "../../../../states/storeSlice/popupSlice";
import { handleReviewDeleteFetchProtected } from "../../../../fetch/ProfileFetch";
import { getAllReviews } from "../../../../states/storeSlice/listReviewsSlice";
import { handleReviewDeleteAdminFetchProtected } from "../../../../fetch/AdminFetch";

const CardReview = ({review}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUserSliceMode);
    const [visiableDelete, setVisiableDelete] = useState(false);

    useEffect(() => {
        if(user){
            if(user.Id_client === review.Id_Client)
                setVisiableDelete(true);
        }
    }, [user]);

    const handleBottonDelete = async(e) =>{
        e.preventDefault();
        try{
            if(user.Role_Client === "Client")
                await handleReviewDeleteFetchProtected(review.Id_Review)
            else
                await handleReviewDeleteAdminFetchProtected(review.Id_Review)
                dispatch(getAllReviews());
        }catch(error){
            console.error(error.message);
        }
    }

    return(
        <div className="review-body-element">
                    {
                       (visiableDelete || user.Role_Client === "Admin") && 
                       <img
                       onClick={handleBottonDelete}
                       className="review-delete-botton" 
                       src={closeBotton}/>
                    }
                    <div className="review-element-header-block">
                        <p className="review-element-header-title">{review.Client.Name_Client}</p>
                    </div>
                    <div className="review-element-main-block">
                        <p className="review-element-main-text">{review.Review}</p>
                    </div>
                    <img className="review-element-icon"
                            src = {review.Client.Photo_Client}
                            alt="user"
                            loading="lazy"
                            align="center"
                    />
        </div>
    );   
}
export default CardReview;