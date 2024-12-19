import { HfInference } from "@huggingface/inference"
import { supabase } from "../../../lib/auth.js"
import "./noteRedactor.css"
import {useEffect, useState} from "react";

function NoteRedactor({ note }) {

    const [aiMessage, setAiMessage] = useState('');
    const [edit, setEdit] = useState(false);    
    const [content, setContent] = useState("Untiled");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (note) {
            setContent(note.content);
            setTitle(note.title);
        }
    }, [note]);

    async function handleAiGenerate(event) {
        event.preventDefault()

        let out = content + "\n";

        const client = new HfInference(import.meta.env.VITE_AI_API_KEY)

        const stream = client.chatCompletionStream({
            model: "meta-llama/Llama-3.2-1B-Instruct",
            messages: [
                { role: "user", content: aiMessage }
            ],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7
        });


        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                out += newContent;
                setContent(out);
            }
        }
    }

    const updateNoteOnBd = async () =>{
        if (edit){
            let edit_title = title.trim();

            if (edit_title === ''){
                alert('Ошибка: загаловок заметки пустой, заполните его.')
                setTitle('');
                return;
            }

            const { error } = await supabase.rpc("create_or_update_note", {
                p_userid: "заглушка",
                p_noteid: "заглушка",
                p_title: "заглушка",
                p_content: "заглушка"
            })

            if (error) {
                alert('Ошибка: ' + error.message);
                return;
            }
        }


        edit ? setEdit(false) : setEdit(true);
    }

    return (
        <div className="note-redactor">
            <div className="redactor">
                <div className="note-header">
                    <input 
                        type="text" 
                        id="TitleNote"
                        className="note-title" 
                        value={title}
                        placeholder="Untiled"
                        onChange={(e) => setTitle(e.target.value)}
                        readOnly={!edit}
                    />
                    <img 
                        className="edit_icon" 
                        src={edit ? "../../../public/pencil-note.svg" : "../../../public/open-book.svg"}
                        alt="Brush icon"
                        onClick={(e) => updateNoteOnBd(e)}
                    />
                </div>
                <div className="note-body">
                    <textarea 
                        className="note-content"  
                        title="ContentNote"
                        value={content} 
                        placeholder="Введите свой текст..."
                        onChange={(e) => setContent(e.target.value)}
                        disabled={!edit} 
                    />
                </div>
            </div>
            <div className="ai-request">
                <form >
                    <input type="text" onChange={(e) => setAiMessage(e.target.value)}/>
                    <input type="submit" value = " " onClick={(e) => handleAiGenerate(e)}/>
                </form>
            </div>
        </div>
    )
}

export default NoteRedactor;