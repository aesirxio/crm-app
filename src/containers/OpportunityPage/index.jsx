// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { OpportunityViewModelContextProvider } from './OpportunityViewModel/OpportunityViewModelContextProvider';
import OpportunityStore from './OpportunityStore/OpportunityStore';
import OpportunityListViewModel from './OpportunityViewModel/OpportunityListViewModel';
import ListOpportunities from './Component/ListOpportunities';

const opportunityStore = new OpportunityStore();
const opportunityListViewModel = new OpportunityListViewModel(opportunityStore);

const OpportunityPage = observer(
  class OpportunityPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <OpportunityViewModelContextProvider viewModel={opportunityListViewModel}>
            <ListOpportunities />
          </OpportunityViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(OpportunityPage);
