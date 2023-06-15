/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from 'aesirx-uikit';
import { CRM_COMPANY_DETAIL_FIELD_KEY } from 'aesirx-lib';
class CompanyDetailViewModel {
  companyStore = null;
  formStatus = PAGE_STATUS.READY;
  companyDetailViewModel = null;
  aliasChange = '';
  statusListItems = [];
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(companyStore) {
    makeAutoObservable(this);
    this.companyStore = companyStore;
  }

  setForm = (companyDetailViewModel) => {
    this.companyDetailViewModel = companyDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.companyStore.getDetail(
      this.companyDetailViewModel.formPropsData[CRM_COMPANY_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetCompanySuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.companyStore.createCompany(
      this.companyDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.companyStore.updateCompany(
      this.companyDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result?.statusListItems) {
      this.statusListItems = result.statusListItems;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetCompanySuccessHandler = (result) => {
    if (result) {
      this.companyDetailViewModel.formPropsData = {
        ...this.companyDetailViewModel.formPropsData,
        ...Object.keys(CRM_COMPANY_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [CRM_COMPANY_DETAIL_FIELD_KEY[index]]: result[CRM_COMPANY_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.companyDetailViewModel.formPropsData[key] = {};
        Object.assign(this.companyDetailViewModel.formPropsData[key], value);
      } else {
        this.companyDetailViewModel.formPropsData[key] = value;
      }
    }
  };

  getStatusList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.companyStore.getStatusList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
}

export default CompanyDetailViewModel;
