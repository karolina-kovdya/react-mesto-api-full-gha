import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Navbar from "./Navbar";
import api from "../utils/Api";
import { currentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    useState(false);
  const [isAddCardPoppupOpened, setIsAddCardPopipOpened] = useState(false);
  const [isChangeAvatarPopupOpened, setIsChangeAvatarPopupOpened] =
    useState(false);
  const [isConfirmationPopupOpened, setIsConfirmationPopupOpened] =
    useState(false);
  const [confirmDeleteCard, setConfirmDeleteCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistred] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkJwt();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cardData, userInfo]) => {
        setCurrentUser(userInfo);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    const closePopupWithEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    window.addEventListener("keydown", closePopupWithEsc);
    return () => window.removeEventListener("keydown", closePopupWithEsc);
  }, [
    isEditProfilePopupOpened,
    isAddCardPoppupOpened,
    isChangeAvatarPopupOpened,
    isConfirmationPopupOpened,
    isInfoTooltip,
    selectedCard,
    isNavbarOpened
  ]);

  function checkJwt() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("401 Переданный токен некорректен");
          }
        });
    }
  }

  function handleLogin({ email, password }) {
    return Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false)
        setIsInfoTooltip(true)
      });
  }

  function handleRegister({ email, password }) {
    return Auth.register(email, password)
      .then(() => {
        setIsRegistred(true);
        setIsInfoTooltip(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false);
        setIsInfoTooltip(true);
      });
  }

  function handleSignOut () {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in")
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(!isEditProfilePopupOpened);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopipOpened(!isAddCardPoppupOpened);
  }

  function handleEditAvatarClick() {
    setIsChangeAvatarPopupOpened(!isChangeAvatarPopupOpened);
  }

  function handleConfirmationClick(card) {
    setConfirmDeleteCard(card);
    setIsConfirmationPopupOpened(!isConfirmationPopupOpened);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleNavbarClick() {
    setIsNavbarOpened(!isNavbarOpened)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(isLiked, card)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((selectedCard) =>
          selectedCard.filter((i) => i._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleConfirmDelete() {
    handleCardDelete(confirmDeleteCard);
  }

  function handleUpdateUser(name, about) {
    api
      .editProfile(name, about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups(e) {
    setIsEditProfilePopupOpened(false);
    setIsAddCardPopipOpened(false);
    setIsChangeAvatarPopupOpened(false);
    setIsConfirmationPopupOpened(false);
    setIsInfoTooltip(false);
    setIsNavbarOpened(false)
    setSelectedCard({});
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div>
        <div className="App">
          <Navbar
            isOpen={isNavbarOpened}
            onClose={closeAllPopups}
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />
          <Header 
            userEmail={userEmail} 
            onSignOut={handleSignOut} 
            onNavbar={handleNavbarClick}
            isOpen={isNavbarOpened}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onConfirm={handleConfirmationClick}
                  cards={cards}
                />
                <Footer />
                </>
              }
            />
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
            <Route 
              path="/sign-in" 
              element={<Login onSignIn={handleLogin} />} 
            />
            <Route
              path="/sign-up"
              element={<Register onSignUp={handleRegister} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpened}
            onClose={closeAllPopups}
            onUbdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddCardPoppupOpened}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isChangeAvatarPopupOpened}
            onClose={closeAllPopups}
            onUbdateUser={handleUpdateAvatar}
          />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpened}
            onClose={closeAllPopups}
            onCardDelete={handleConfirmDelete}
            card={cards}
          />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isSuccsses={isRegistered}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
