import {ReactDOM, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../../../states/storeSlice/listReviewsSlice";
import {Link} from "react-router-dom";
import { setPopupState } from "../../../../states/storeSlice/popupSlice";
import CardReview from "../../Cards/CardReview/CardReview";
import "../BodyPsychologistList/BodyPsychologist.css"
import "./BodyReview.css"

const BodyReview = () =>{

    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUserSliceMode);
    const {status, error,reviews} = useSelector(state => state.listReviewsSliceMode)
    const [visiableCreate, setVisiableCreate] = useState(false)
    useEffect(() => {
        dispatch(getAllReviews())
    }, [])

    useEffect(() => {
        let visiableBotton = true;
        reviews.map(review => {
            if(review.Id_Client === user.Id_client)
                visiableBotton = false;
        })
        setVisiableCreate(visiableBotton);
    }, [reviews])

    const openReview = () =>{
        dispatch(setPopupState("Review"))
    }

    return(
        <div className="container-list-body">
            <div className="container-list-wrapper">
                <div className="title-list-body-block">
                        <p className="title-list-body">
                            Отзывы
                        </p>
                        { user.Role_Client === "Client" && visiableCreate && <button onClick={openReview} className="create-review-list" type="button">Создать</button> }
                </div>
                { status === 'loading' && <p>Загрузка...</p> }
                { status === 'rejected' && <p>Возникла ошибка: {error}</p>}
                { status === 'fulfilled' && reviews && reviews.map((review) => <CardReview review = {review} />)}
            </div>
        </div>
    );   
}
export default BodyReview;