function SettingsButton(props) {
    const { openSettings } = props;
    
    return (
        <button
            type="button"
            className="btn btn-settings"
            onClick={openSettings}
        >
            Settings
        </button>
    );
}

export default SettingsButton;
