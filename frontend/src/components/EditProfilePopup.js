import React, {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from "../contexts/CurrentUserContext";
import {UseInput} from "../hooks/UseInput";

function EditProfilePopup({ isOpen, onClose, onUbdateUser}) {
  const currentUser = useContext(currentUserContext);
  const name = UseInput(`${currentUser.about || ""}`, {isEmpty: true, minLength: 3, maxlength: 30});
  const description = UseInput(`${currentUser.about || ""}`, {isEmpty: true, minLength: 3, maxlength: 30})
  const [formValid, setFormValid] = useState(true);

  useEffect (() => {
    if (name.isEmpty || name.minLengthError || name.maxLengthError || description.isEmpty || description.minLengthError || description.maxLengthError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  },[name.isEmpty, name.minLengthError, name.maxLengthError,description.isEmpty, description.minLengthError, description.maxLengthError])

  function handleSubmit(e) {
    e.preventDefault();

    onUbdateUser({
      name: name.value,
      about: description.value
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!formValid}
    >
      <>
        <div className="form__field">
          <input
            type="text"
            name="name"
            value={name.value}
            onChange={e => name.onChange(e)}
            onBlur={e => name.onBlur(e)}
            placeholder="Имя"
            id="name-input"
            className="form__input form__input_el_name"
          />
          {(name.isDirty && name.isEmpty) && <span style={{color:'red', fontSize: 12}}>Поле не может быть пустым.</span>}
          {(name.isDirty && name.minLengthError) && <span style={{color:'red', fontSize: 12}}>{name.minLengthError}</span>}
          {(name.isDirty && name.maxLengthError) && <span style={{color:'red', fontSize: 12}}>{name.maxLengthError}</span>}
          
        </div>
        <div className="form__field">
          <input
            type="text"
            name="job"
            value={description.value}
            onChange={e => description.onChange(e)}
            onBlur={e => description.onBlur(e)}
            placeholder="О себе"
            id="job-input"
            className="form__input form__input_el_job"
          />
          {(description.isDirty && description.isEmpty) && <span style={{color:'red', fontSize: 12}}>Поле не может быть пустым.</span>}
          {(description.isDirty && description.minLengthError) && <span style={{color:'red', fontSize: 12}}>{description.minLengthError}</span>}
          {(description.isDirty && description.maxLengthError) && <span style={{color:'red', fontSize: 12}}>{description.maxLengthError}</span>}
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
