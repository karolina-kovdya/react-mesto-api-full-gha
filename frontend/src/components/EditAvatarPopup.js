import React, {useRef, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUbdateUser}) {
    const avatarRef = useRef();
    const [linkDirty, setLinkDirty] = useState(false);
    const [linkError, setLinkError] = useState("Поле не может быть пустым");
    const [formValid, setFormValid] = useState(false);

    useEffect (() => {
      if (linkError) {
        setFormValid(false)
      } else {
        setFormValid(true)
      }
    }, [linkError]);

    function handleChangeLink() {
      const re = /^(ftp|http|https):\/\/[^ "]+$/;
  
      if(!re.test(avatarRef.current.value)) {
        setLinkError('Это поле должно содержать URL-адресс')
      } else {
        setLinkError('')
      }
    }

    function handleSubmit (e) {
        e.preventDefault();

        onUbdateUser({
            avatar: avatarRef.current.value
        })

        avatarRef.current.value = ""
    }

    function blurHandleLink () {
      switch(avatarRef.current.name) {
        case 'avatar':
          setLinkDirty(true)
          break
  
          default:
      }
    }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!formValid}
    >
      <>
        <div className="form__field">
          <input
            onBlur={blurHandleLink}
            onChange={handleChangeLink}
            type="text"
            name="avatar"
            ref={avatarRef}
            placeholder="Ссылка на картинку"
            id="avatar-input"
            className="form__input form__input_avatar"
          />
          {(linkDirty && linkError) && <span style={{color:'red', fontSize: 12}}>{linkError}</span>}
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup