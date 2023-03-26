function ImagePopup({card, onClose}) {
  return (
    <section className={
      Object.keys(card).length !== 0 ? "popup popup_show-card popup_opened": "popup"} onClick={onClose}>
      <div className="popup__card-container" onClick={e => e.stopPropagation()}>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__subtitle">{card.name}</p>
        <button onClick={onClose} className="popup__close popup__close-show" type="button" aria-label="Close"></button>
      </div>
    </section>
  )
}

export default ImagePopup;

