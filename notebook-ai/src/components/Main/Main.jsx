import "./main.css"
import {useNavigate} from "react-router-dom";
import NoteRedactor from "./NoteRedactor/NoteRedactor.jsx";
import Templates from "./Modals/Templates/Templates.jsx";
import Profile from "./Modals/Profile/Profile.jsx";
import Theme from "./Modals/Theme/Theme.jsx";
import {useState} from "react";

function Main(){

    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);

    const handleOpenTemplates = () => {
        setIsTemplateOpen(true);
    }

    const handleCloseTemplates = () => {
        setIsTemplateOpen(false);
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
        navigate('/');
    }

    return (
        <div className="main">
            <div className="main-component">

                <div className="main-buttons">
                    <button onClick={handleOpenTheme}>
                        <img src="../../../public/brush.svg" alt="Brush icon"/>
                    </button>
                    <button onClick={handleOpenTemplates}>
                        <img src="../../../public/template.svg" alt="Brush icon"/>
                    </button>
                    <button>
                        <img src="../../../public/ai.svg" alt="Brush icon"/>
                    </button>
                </div>

                <div className="main-profile">
                    <div className="profile">
                        <img src="../../../public/avatar.png" className="profile-avatar" onClick={handleOpenProfile} />
                        <label>Username</label>
                    </div>
                    <div className="notes">
                        <div className="search">
                            <input type="text" name="search"/>
                            <img src="../../../public/loupe.svg" alt="Search" />
                        </div>
                        <div className="note"><span>Заметка 1</span></div>
                        <div className="note"><span>Заметка 2</span></div>
                        <div className="note"><span>Заметка 3</span></div>
                    </div>
                    <div className="exit">
                        <button onClick={handleRedirectToLogin}>Exit</button>
                    </div>
                </div>

                <div className="main-edit">
                    <NoteRedactor></NoteRedactor>
                </div>
            </div>
            <Templates isOpen={isTemplateOpen} onClose={handleCloseTemplates}></Templates>
            <Profile isOpen={isProfileOpen} onClose={handleCloseProfile}></Profile>
            <Theme isOpen={isThemeOpen} onClose={handleCloseTheme}></Theme>
        </div>
    )
}

export default Main;