/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ContactViewModelContext = React.createContext();

export const ContactViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ContactViewModelContext.Provider value={viewModel}>
      {children}
    </ContactViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useContactViewModel = () => React.useContext(ContactViewModelContext);

/* HOC to inject store to any functional or class component */
export const withContactViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useContactViewModel()} />;
};
