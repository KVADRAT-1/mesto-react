function PopupWithForm({ title, name, buttonText, isOpen, children, onClose }) {

    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className={`popup__close-button popup__close-button-${name}`} onClick={onClose} type="button"></button>
                <h2 className="popup__heading">{title}</h2>
                <form className={`form popup__form popup__form-${name}`} name={`popup__form-${name}`} noValidate>
                    <fieldset className="popup__form-set">
                        {children}
                        <button className={`popup__submit-button popup__submit-button-${name}`} type="submit">{buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;