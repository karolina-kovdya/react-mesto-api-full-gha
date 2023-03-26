import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({isOpen, onClose, onCardDelete}) {

    function handleSubmit(e) {
        e.preventDefault();
    
        onCardDelete()
      }

  return (
    <PopupWithForm
    name="confirm"
    title="Вы уверены?"
    buttonText="Да"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
  </PopupWithForm>
  );
}

export default ConfirmationPopup;
