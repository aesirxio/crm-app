/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const OpportunityViewModelContext = React.createContext();

export const OpportunityViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <OpportunityViewModelContext.Provider value={viewModel}>
      {children}
    </OpportunityViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useOpportunityViewModel = () => React.useContext(OpportunityViewModelContext);

/* HOC to inject store to any functional or class component */
export const withOpportunityViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useOpportunityViewModel()} />;
};
