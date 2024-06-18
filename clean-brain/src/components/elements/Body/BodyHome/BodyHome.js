import React from "react";
import {Link} from "react-router-dom";
import "./BodyHome.css"

const BodyHome = () =>{
    return(
        <div className="container-home-body">
                    <div className="container-home-wrapper">
                        <div className="title-home-body-block">
                            <p className="title-home-body">
                                Мы рады вас видеть
                            </p>
                        </div>

                        <div className="home-body-element">
                            <div className="body-element-image-block"/>
                            <div className="body-text-block">
                                <p className="body-title-element">Только самые опытные специалисты</p>
                                <p className="body-text-element">Наши специалисты всегда помогут найти решение даже в самой сложной жизненной ситуации. На их плечах более 100 успешных пациентов.</p>
                            </div>
                        </div>

                        <div className="home-body-element second-body-element ">
                            <div className="second-body-text-block">
                                <p className="body-title-element">Не понимаете друг друга</p>
                                <p className="body-text-element">Когда мосты взаимопонимания между людьми кажутся разрушенными, когда слова теряют свой смысл, и кажется, что найти общий язык невозможно, наш психологический центр открывает свои двери для вас.</p>
                            </div>
                            <div className="second-body-element-image-block"/>
                        </div>
                        <div className="home-body-line"/>
                        <div className="home-body-services">
                            <div className="body-service-title-block">
                                <p className="body-services-title">Наша цель</p>
                            </div>
                            <div className="body-services-list-block">
                                <p className="body-about-message">В нашем психологическом центре мы глубоко убеждены, что каждый человек заслуживает счастья, покоя и гармонии в жизни. Мы знаем, как иногда жизненные обстоятельства могут казаться непреодолимыми, а проблемы — безвыходными. Наша главная цель — помочь вам найти путь сквозь туман трудностей, обрести уверенность в себе и в своих силах, чтобы принимать обдуманные решения даже в самых сложных ситуациях.
Мы стремимся создать пространство, где каждый чувствует себя услышанным и понятым. Здесь вы можете поделиться своими переживаниями и страхами без страха осуждения. Наши специалисты работают с вами рука об руку, исследуя корни проблем, разрабатывая стратегии преодоления трудностей и восстановления эмоционального баланса.</p>
                            </div>
                            <Link className="home-body-link" to="/procedure">
                                <div className="body-link-block">
                                    <p className="body-link-text">Услуги</p>
                                </div>
                            </Link>
                        </div>
                    </div>
        </div>
    );   
}
export default BodyHome;