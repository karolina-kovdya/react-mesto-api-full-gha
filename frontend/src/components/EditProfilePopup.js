import React, {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUbdateUser}) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser])

  function handleChangeName(e) {
    setName((e.target.value));
  }

  function handleChangeAbout(e) {
    setDescription((e.target.value))
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUbdateUser({
      name: name,
      about: description
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
    >
      <>
        <div className="form__field">
          <input
            type="text"
            name="name"
            value={name || ""}
            onChange={handleChangeName}
            placeholder="Имя"
            id="name-input"
            className="form__input form__input_el_name"
            minLength={2}
            maxLength={30}
          />
         <span style={{color:'red', fontSize: 12}}></span>
        </div>
        <div className="form__field">
          <input
            type="text"
            name="job"
            value={description || ""}
            onChange={handleChangeAbout}
            placeholder="О себе"
            id="job-input"
            className="form__input form__input_el_job"
            minLength={2}
            maxLength={30}
          />
          <span style={{color:'red', fontSize: 12}}></span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;