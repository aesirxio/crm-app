// import PieChart from 'components/PieChartComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { CompanyViewModelContextProvider } from './CompanyViewModel/CompanyViewModelContextProvider';
import CompanyStore from './CompanyStore/CompanyStore';
import CompanyListViewModel from './CompanyViewModel/CompanyListViewModel';
import ListCompanies from './Component/ListCompanies';

const companyStore = new CompanyStore();
const companyListViewModel = new CompanyListViewModel(companyStore);

const CompanyPage = observer(
  class CompanyPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <CompanyViewModelContextProvider viewModel={companyListViewModel}>
            <ListCompanies />
          </CompanyViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(CompanyPage);
