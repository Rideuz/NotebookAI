import "./main.css"
import {useNavigate} from "react-router-dom";
import NoteRedactor from "./NoteRedactor/NoteRedactor.jsx";
import Profile from "./Modals/Profile/Profile.jsx";
import Theme from "./Modals/Theme/Theme.jsx";
import {useEffect, useState} from "react";
import {removeUserData, getUserData, getUserNotes} from "../../lib/userStorage.js";

function Main(){

    const [selectedNote, setSelectedNote] = useState(null);
    const [userId, setUserId] = useState([])
    const [userNotes, setUserNotes] = useState([])
    const [userName, setUserName] = useState("Unknown")
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUserName(userData.username);
            setUserId(userData.id);
        }
    }, []);

    useEffect(() => {
        const fetchUserNotes = async () => {
            if (userId) {
                const notes = await getUserNotes(userId);
                setUserNotes(notes || []);
            }
        };

        fetchUserNotes();
    }, [userId]);

    const handleOpenTemplates = () => {
        
    }

    const handleOpenProfile = () => {
        setIsProfileOpen(true);
    }

    const handleCloseProfile  = () => {
        setIsProfileOpen(false);
    }

    const handleOpenTheme = () => {
        setIsThemeOpen(true);
    }

    const handleCloseTheme  = () => {
        setIsThemeOpen(false);
    }

    const navigate = useNavigate();

    const handleRedirectToLogin = () => {
        removeUserData();
        navigate('/');
    }

    const renderNotes = () => {
        const filteredNotes = userNotes.filter(note =>
            note.title.toLowerCase().slice(0, searchTerm.toLowerCase().length).includes(searchTerm.toLowerCase()) // Фильтрация заметок по заголовку
        );

        return filteredNotes.map(note => (
            <span
                key={note.id}
                onClick={() => handleNoteClick(note)}
            >{note.title}</span>
        ));
    };

    const handleNoteClick = (note) =>{
        setSelectedNote(note)
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Обновление состояния при изменении ввода
    };

    return (
        <div className="main">
            <div className="main-component">

                <div className="main-buttons">
                    <button onClick={handleOpenTheme}>
                        <img src="../../../public/brush.svg" alt="Brush icon"/>
                    </button>
                    <button onClick={handleOpenTemplates}>
                        <img src="../../../public/template.svg" alt="   Template icon"/>
                    </button>
                    <button>
                        <img src="../../../public/ai.svg" alt="AI icon"/>
                    </button>
                    <button onClick={handleRedirectToLogin}>
                        <img src="../../../public/logout.svg" alt="Logout icon"/>
                    </button>
                </div>

                <div className="main-profile">
                    <div className="profile" onClick={handleOpenProfile}>
                        <img src="../../../public/avatar.png" className="profile-avatar"/>
                        <label>{userName}</label>
                    </div>
                    <div className="search">
                        <input type="text" name="search" onChange={handleSearchChange}/>
                        <img src="../../../public/loupe.svg" alt="Search"/>
                    </div>
                    <div className="notes">
                        {
                            renderNotes()
                        }
                    </div>
                </div>

                <div className="main-edit">
                    {selectedNote  && <NoteRedactor note={selectedNote} />}
                </div>
            </div>
            <Profile isOpen={isProfileOpen} onClose={handleCloseProfile}></Profile>
            <Theme isOpen={isThemeOpen} onClose={handleCloseTheme}></Theme>
        </div>
    )
}

export default Main;