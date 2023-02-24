/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import CompanyStore from 'containers/CompanyPage/CompanyStore/CompanyStore';
import CompanyViewModel from 'containers/CompanyPage/CompanyViewModel/CompanyViewModel';
import { CompanyViewModelContextProvider } from 'containers/CompanyPage/CompanyViewModel/CompanyViewModelContextProvider';
import EditCompany from './CompanyEdit';
const companyStore = new CompanyStore();
const companyViewModel = new CompanyViewModel(companyStore);

const EditCompanyProvider = observer(
  class EditCompanyProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <CompanyViewModelContextProvider viewModel={companyViewModel}>
          <EditCompany />
        </CompanyViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditCompanyProvider);
