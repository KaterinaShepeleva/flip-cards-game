import Modal from 'react-modal';

import './SettingsModal.css'

Modal.setAppElement('#root');

function SettingsModal(props) {
    const { isOpen, closeModal } = props;
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            overlayClassName="settings-modal-overlay"
            className="settings-modal"
            id="settings"
        >
            <div className="settings-modal-header">
                <h2 className="heading">Settings</h2>
                <button
                    type="button"
                    className="btn close"
                    onClick={closeModal}
                >
                    ×
                </button>
            </div>
            
            <p>settings content</p>
        </Modal>
    )
}

export default SettingsModal;
