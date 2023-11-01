import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
    const [showCompleted, setShowCompleted] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(5); 
    
  useEffect(() => {
      const savedSettings = localStorage.getItem('todoAppSettings');
      if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setShowCompleted(parsedSettings.showCompleted);
          setItemsPerPage(parsedSettings.itemsPerPage);
      }
  }, []);
  
  useEffect(() => {
      localStorage.setItem('todoAppSettings', JSON.stringify({ showCompleted, itemsPerPage }));
  }, [showCompleted, itemsPerPage]);
  
    return (
        <SettingsContext.Provider value={{ showCompleted, setShowCompleted, itemsPerPage, setItemsPerPage }}>
            {props.children}
        </SettingsContext.Provider>
    );
};
