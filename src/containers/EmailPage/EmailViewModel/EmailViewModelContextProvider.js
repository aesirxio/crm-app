/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const EmailViewModelContext = React.createContext();

export const EmailViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <EmailViewModelContext.Provider value={viewModel}>{children}</EmailViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useEmailViewModel = () => React.useContext(EmailViewModelContext);

/* HOC to inject store to any functional or class component */
export const withEmailViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useEmailViewModel()} />;
};
