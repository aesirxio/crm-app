/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import OpportunityStore from 'containers/OpportunityPage/OpportunityStore/OpportunityStore';
import OpportunityViewModel from 'containers/OpportunityPage/OpportunityViewModel/OpportunityViewModel';
import { OpportunityViewModelContextProvider } from 'containers/OpportunityPage/OpportunityViewModel/OpportunityViewModelContextProvider';
import EditOpportunity from './OpportunityEdit';
const opportunityStore = new OpportunityStore();
const opportunityViewModel = new OpportunityViewModel(opportunityStore);

const EditOpportunityProvider = observer(
  class EditOpportunityProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <OpportunityViewModelContextProvider viewModel={opportunityViewModel}>
          <EditOpportunity />
        </OpportunityViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditOpportunityProvider);
