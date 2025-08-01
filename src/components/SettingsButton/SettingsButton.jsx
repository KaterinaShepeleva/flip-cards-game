import { useStore } from '/src/store.js';

function SettingsButton() {
    const openModal = useStore((state) => state.openModal);
    
    return (
        <button
            type="button"
            className="btn btn-settings"
            onClick={openModal}
        >
            Settings
        </button>
    );
}

export default SettingsButton;
