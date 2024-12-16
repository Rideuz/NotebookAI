import "./noteRedactor.css"

function NoteRedactor() {
    return (
        <div className="note-redactor">
            <div className="redactor">
                <div className="note-header">
                    <input type="text" className="note-title" placeholder="Untiled"/>
                </div>
                <div className="note-body">
                    <textarea className="note-content"></textarea>
                    {/*<div className="note-image-upload">*/}
                    {/*    <input type="file" className="image-input" accept="image/*"/>*/}
                    {/*</div>*/}
                    {/*<div className="note-images">*/}
                    {/*    Тут будут отображатся ваши сообщения*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="ai-request">
                <form>
                    <input type="text"/>
                    <input type="submit" value=" "/>
                </form>
            </div>
        </div>
    )
}

export default NoteRedactor;