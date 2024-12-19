import "./noteRedactor.css"
import { HfInference } from "@huggingface/inference"
import {useEffect, useState} from "react";

function NoteRedactor({ note }) {

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

        let out = "";

        const client = new HfInference(import.meta.env.VITE_AI_API_KEY)

        const stream = client.chatCompletionStream({
            model: "meta-llama/Llama-3.2-1B-Instruct",
            messages: [
                { role: "user", content: "Привет!!!!(Пиши на русском)" }
            ],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7
        });

        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                out += newContent;
            }
        }

        console.log(out);
    }

    return (
        <div className="note-redactor">
            <div className="redactor">
                <div className="note-header">
                    <input type="text" className="note-title"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="note-body">
                    <textarea className="note-content"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <div className="ai-request">
                <form>
                    <input type="text"/>
                    <input type="submit" value=" " onClick={(e)=>handleAiGenerate(e)}/>
                </form>
            </div>
        </div>
    )
}

export default NoteRedactor;