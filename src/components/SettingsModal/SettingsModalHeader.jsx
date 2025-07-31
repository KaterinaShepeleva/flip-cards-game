import closeIcon from '/src/assets/close-icon.svg';

const SettingsModalHeader = ({ closeModal }) => (
    <div className="settings-modal-header">
        <h2 className="heading">Settings</h2>
        <button
            type="button"
            className="btn close"
            onClick={closeModal}
        >
            <img
                className="icon"
                src={closeIcon}
                alt="Close Modal"
                draggable="false"
            />
        </button>
    </div>
);

export default SettingsModalHeader;
