import React, {useContext} from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onConfirm}) {
  const currentUser = useContext(currentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `place__button-like ${isLiked && 'place__button-like_active'}` 
  );

  function handleClick () {
    onCardClick(card)
  }

  function handleLikeClick () {
    onCardLike(card)
  }

  function handleDeleteClick () {
    onConfirm(card)
  }

  return (
    <li className="item">
      <div className="place__container">
        <img onClick={handleClick} src={card.link} alt={card.name} className="place__image" />
        {isOwn && <button onClick={handleDeleteClick} className="place__button-delete" type="button" aria-label="Delete" />}
        <div className="place__elements">
          <h2 className="place__title">{card.name}</h2>
          <div className="place__el-like">
            <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Like"></button>
            <span className="place__counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    </li>
)
}

export default Card;
