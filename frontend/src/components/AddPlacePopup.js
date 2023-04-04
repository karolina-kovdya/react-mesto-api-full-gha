import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [titleDirty, setTitleDirty] = useState(false);
  const [linkDirty, setLinkDirty] = useState(false);
  const [titleError, setTitleError] = useState("Поле не может быть пустым");
  const [linkError, setLinkError] = useState("Поле не может быть пустым");
  const [formValid, setFormValid] = useState(false);

  useEffect (() => {
    if (titleError || linkError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [titleError, linkError])

  function handleChangeTitle(e) {
    setTitle(e.target.value);

    if(e.target.value.length < 3 || e.target.value.length > 30) {
      setTitleError('Это поле должно содержать от 3 до 30 символов')
    } else {
      setTitleError('')
    }
  }

  function handleChangeLink(e) {
    setLink(e.target.value);

    const re = /^(ftp|http|https):\/\/[^ "]+$/;

    if(!re.test(e.target.value)) {
      setLinkError('Это поле должно содержать URL-адресс')
    } else {
      setLinkError('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });

    setTitle("");
    setLink("");
  }

  function blurHandleTitle (e) {
    switch(e.target.name) {
      case 'name':
        setTitleDirty(true)
        break

        default:
    }
  }

  function blurHandleLink (e) {
    switch(e.target.name) {
      case 'link':
        setLinkDirty(true)
        break

        default:
    }
  }

  return (
    <PopupWithForm
      name="added"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!formValid}
    >
      <>
        <div className="form__field">
          <input
            onBlur={blurHandleTitle}
            type="text"
            name="name"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Название"
            id="title-input"
            className="form__input form__input_el_title"
          />
          {(titleDirty && titleError) && <span style={{color:'red', fontSize: 12}}>{titleError}</span>}
        </div>
        <div className="form__field">
          <input
            onBlur={blurHandleLink}
            onChange={handleChangeLink}
            type="url"
            name="link"
            value={link}
            placeholder="Ссылка на картинку"
            id="photo-input"
            className="form__input form__input_el_photo"
          />
          {(linkDirty && linkError) && <span style={{color:'red', fontSize: 12}}>{linkError}</span>}
        </div>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
