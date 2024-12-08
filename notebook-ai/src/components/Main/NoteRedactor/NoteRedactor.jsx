import "./noteRedactor.css"

function NoteRedactor() {
    return (
        <div className="note-redactor">
            <div className="redactor">
                <div className="note-header">
                    <input type="text" className="note-title" placeholder="Заголовок заметки"/>
                </div>
                <div className="note-body">
                    <textarea className="note-content" placeholder="Напишите вашу заметку..."></textarea>
                    <div className="note-image-upload">
                        <input type="file" className="image-input" accept="image/*"/>
                    </div>
                    <div className="note-images">
                        Тут будут отображатся ваши сообщения
                    </div>
                </div>
            </div>
            <div className="ai-request">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text"/>
                    <input type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default NoteRedactor;