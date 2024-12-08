import "./templates.css"

const Templates = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        // Закрыть окно при клике за пределами модалки
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <div className="templates" onClick={handleClickOutside}>
            <div className="templates-content">
                <div className="templates-header">
                    <h2>Choice Template</h2>
                </div>
                <div className="templates-button">
                    <button>Ежедневник</button>
                    <button>Обычная заметка</button>
                    <button>Задачник</button>
                </div>
            </div>
        </div>
    )
}

export default Templates;