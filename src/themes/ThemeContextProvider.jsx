/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const ThemesContext = React.createContext();

const listThemes = [
  { theme: 'light', color: '#0A083B', className: '' },
  { theme: 'dark', color: '#fff', className: '' },
];
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export class ThemesContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getCurrentTheme(),
    };
  }

  getCurrentTheme = () => {
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      localStorage.setItem('theme', JSON.stringify(listThemes[0]));
      return currentTheme ?? listThemes[0];
    }
    return isJson(currentTheme) ? JSON.parse(currentTheme) : listThemes[0];
  };

  changeTheme = (theme) => {
    if (theme) {
      const themeCheck = listThemes
        .filter((_theme) => _theme.theme !== theme.theme)
        .reduce((accumulator, currentValue) => currentValue, {});
      this.setState({ theme: themeCheck });
      localStorage.setItem('theme', JSON.stringify(themeCheck));
      document.documentElement.setAttribute('class', themeCheck?.theme);
    } else {
      this.setState({ theme: listThemes[0] });
      localStorage.setItem('theme', JSON.stringify(listThemes[0]));
      document.documentElement.setAttribute('class', listThemes[0]?.theme);
    }
  };

  componentDidMount() {
    document.documentElement.setAttribute('class', this.state.theme?.theme);
  }

  render() {
    return (
      <ThemesContext.Provider
        value={{ theme: this.state.theme, listThemes, changeTheme: this.changeTheme }}
      >
        {this.props.children}
      </ThemesContext.Provider>
    );
  }
}

/* Hook to use store in any functional component */
export const useThemeContext = () => React.useContext(ThemesContext);

/* HOC to inject store to any functional or class component */
export const withThemeContext = (Component) => (props) => {
  return <Component {...props} {...useThemeContext()} />;
};
