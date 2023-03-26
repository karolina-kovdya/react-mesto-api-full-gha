function PopupWithForm (props) {

  return (
    <div>
      <section className={`${props.isOpen ? `popup popup_${props.name} popup_opened` : `popup`}`} onClick={props.onClose}>
        <div className="popup__container" onClick={e => e.stopPropagation()}>
          <h2 className="popup__title">{props.title}</h2>
          <form  onSubmit={props.onSubmit} className="form" noValidate>
            <fieldset className="form__set">
              {props.children}
            </fieldset>
            <button disabled={props.disabled} type="submit" className="form__button-submit form__button-submit_edit">{props.buttonText}</button>
          </form>

          <button onClick={props.onClose} className="popup__close" type="button" aria-label="Close"></button>
        </div>
      </section>
    </div>
  );
}

export default PopupWithForm;
