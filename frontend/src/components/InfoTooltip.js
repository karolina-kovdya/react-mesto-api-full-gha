function InfoTooltip (props) {
    return (
    <div>
      <section className={`${props.isOpen ? `popup popup_opened` : `popup`}`} onClick={props.onClose}>
        <div className="popup__container" onClick={e => e.stopPropagation()}>
          <div className="popup__info-container>">
            <div className={`${props.isSuccsses ? `popup__image-succsses` : `popup__image-fail`}`}></div>
            <p className="popup__info">{props.isSuccsses ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}</p>
            <button onClick={props.onClose} className="popup__close" type="button" aria-label="Close"></button>
          </div>
        </div>
      </section>
    </div>
    )
}

export default InfoTooltip;