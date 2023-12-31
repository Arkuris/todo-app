import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsProvider from './context/Settings/SettingsProvider';
import ThemeProvider from './context/Theme/ThemeProvider';
import Todo from './components/Todo';
import Options from './components/Options'
import Auth from './components/Auth'

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <ThemeProvider>
          <Options />
          <Todo />
          <Auth />
        </ThemeProvider>
      </SettingsProvider>
    );
  }
}
