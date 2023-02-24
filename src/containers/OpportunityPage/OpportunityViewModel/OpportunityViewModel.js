/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import OpportunityDetailViewModel from './OpportunityDetailViewModel';
import OpportunityListViewModel from './OpportunityListViewModel';

class OpportunityViewModel {
  opportunityDetailViewModel = null;
  opportunityListViewModel = null;

  constructor(opportunityStore) {
    if (opportunityStore) {
      this.opportunityDetailViewModel = new OpportunityDetailViewModel(opportunityStore);
      this.opportunityListViewModel = new OpportunityListViewModel(opportunityStore);
    }
  }

  getOpportunityDetailViewModel = () => this.opportunityDetailViewModel;
  getOpportunityListViewModel = () => this.opportunityListViewModel;
}

export default OpportunityViewModel;
