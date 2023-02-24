/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import CompanyDetailViewModel from './CompanyDetailViewModel';
import CompanyListViewModel from './CompanyListViewModel';

class CompanyViewModel {
  companyDetailViewModel = null;
  companyListViewModel = null;

  constructor(companyStore) {
    if (companyStore) {
      this.companyDetailViewModel = new CompanyDetailViewModel(companyStore);
      this.companyListViewModel = new CompanyListViewModel(companyStore);
    }
  }

  getCompanyDetailViewModel = () => this.companyDetailViewModel;
  getCompanyListViewModel = () => this.companyListViewModel;
}

export default CompanyViewModel;
