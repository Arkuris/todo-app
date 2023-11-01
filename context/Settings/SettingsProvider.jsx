import React, { useState } from 'react';

// Implement the Context API
export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [displayItems, setDisplayItems] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');

  return (
    <SettingsContext.Provider 
      value={{ 
        displayItems, 
        hideCompleted, 
        sort, 
        setDisplayItems, 
        setHideCompleted, 
        setSort 
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
