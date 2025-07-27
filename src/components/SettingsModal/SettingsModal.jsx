import { createPortal } from 'react-dom';
import { SETTINGS_MODAL_ROOT } from '/src/constants';

import './SettingsModal.css'

function SettingsModal(props) {
    const { isOpen, onClose } = props;
    
    const rootClassName = ['settings-modal-overlay', isOpen ? '' : 'hidden'].join(' ');
    
    return createPortal((
        <div className={rootClassName}>
            <div className="settings-modal">
                <div className="settings-modal-header">
                    <h2 className="heading">Settings</h2>
                    <button
                        type="button"
                        className="btn close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                
                <p>settings content</p>
            </div>
        </div>
    ), document.getElementById(SETTINGS_MODAL_ROOT))
}

export default SettingsModal;
