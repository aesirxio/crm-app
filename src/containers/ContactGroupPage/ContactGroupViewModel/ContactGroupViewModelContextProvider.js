/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ContactGroupViewModelContext = React.createContext();

export const ContactGroupViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ContactGroupViewModelContext.Provider value={viewModel}>
      {children}
    </ContactGroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useContactGroupViewModel = () => React.useContext(ContactGroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withContactGroupViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useContactGroupViewModel()} />;
};
