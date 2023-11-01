import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext.js';

const SettingsPage = () => {
    const { showCompleted, setShowCompleted, itemsPerPage, setItemsPerPage } = useContext(SettingsContext);

    const handleShowCompletedChange = (event) => {
        setShowCompleted(event.target.checked);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
    };

    return (
        <div>
            <h2>Settings</h2>
            <form>
                <div>
                    <label>
                        Show Completed Items:
                        <input 
                            type="checkbox" 
                            checked={showCompleted}
                            onChange={handleShowCompletedChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Items Per Page:
                        <input 
                            type="number"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            min="1"
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
