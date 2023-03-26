import React from "react";
import cursor from "../images/avatarcursor.svg";
import Card from "./Card";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, onConfirm, cards}) {
  const user = React.useContext(currentUserContext);

  return (
    <main className="content">
      <div className="page">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__cont-av">
              <div className="profile__avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
              <img onClick={onEditAvatar} className="profile__cursor" src={cursor} alt="Редактировать" />
            </div>
            <div className="profile__user-information">
              <h1 className="profile__user-name">{user.name}</h1>
              <p className="profile__user-subname">{user.about}</p>
            </div>
            <button onClick={onEditProfile} className="profile__button profile__button_type_edit" type="button" aria-label="Edit-progile"></button>
          </div>
          <button onClick={onAddPlace} className="profile__button profile__button_type_add" type="button" aria-label="Added-card"></button>
        </section>

        <section className="place">
        <ul className="place__list">
          {cards.map((card) => {
            return <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} onConfirm={onConfirm}/>
          })}
        </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;
