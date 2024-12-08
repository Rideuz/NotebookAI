import "./profile.css"

const Profile = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        // Закрыть окно при клике за пределами модалки
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <div className="profile-edit" onClick={handleClickOutside}>
            <div className="profile-edit-content">
                <div className="profile-edit-header">
                    <img src="../../../public/avatar.png" className="profile-avatar"/>
                </div>
                <div className="profile-edit-redactor">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>
                </div>
                <div className="profile-edit-button">
                    <button>Change</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;