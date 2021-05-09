function PopupWithForm({ title, name, buttonText, isOpen, children, onClose }) {

    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>  {/*id="popup__profileAvatar"  id="popup__profile"  id="popup__addition  id="popup__deletePicture*/}
            <div className="popup__container">
                <button className={`popup__close-button popup__close-button-${name}`} onClick={onClose} type="button"></button> {/*id="popup__close-button-profileAvatar"  id="popup__close-button-profile"  id="popup__close-button-addition"  id="popup__close-button-deletePicture"*/}
                <h2 className="popup__heading">{title}</h2>
                <form className={`form popup__form popup__form-${name}`} name={`popup__form-${name}`} noValidate> {/*id="popup__form-avatar"  id="popup__form-profile"  id="popup__form-picture"  id="popup__form-deletePicture" +++++ name ++++*/}
                    <fieldset className="popup__form-set">
                        {children}
                        <button className={`popup__submit-button popup__submit-button-${name}`} type="submit">{buttonText}</button> {/*id="popup__submit-button-avatar" id="popup__submit-button-picture" className="popup__submit-button"*/}
                    </fieldset>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;