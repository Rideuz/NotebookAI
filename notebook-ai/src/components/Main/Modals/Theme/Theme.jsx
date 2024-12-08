import "./theme.css"

const Theme = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        // Закрыть окно при клике за пределами модалки
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <div className="themes" onClick={handleClickOutside}>
            <div className="themes-content">
                <div className="themes-header">
                    <h2>Choice Template</h2>
                </div>
                <div className="themes-choice">
                    <div className="row">
                        <button>Тема1</button>
                        <button>Тема2</button>
                    </div>
                    <div className="row">
                        <button>Тема3</button>
                        <button>Тема4</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Theme;