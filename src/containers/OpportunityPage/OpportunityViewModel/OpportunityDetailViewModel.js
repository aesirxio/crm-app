/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { CRM_OPPORTUNITY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class OpportunityDetailViewModel {
  opportunityStore = null;
  formStatus = PAGE_STATUS.READY;
  opportunityDetailViewModel = null;
  aliasChange = '';
  stageListItems = [];
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(opportunityStore) {
    makeAutoObservable(this);
    this.opportunityStore = opportunityStore;
  }

  setForm = (opportunityDetailViewModel) => {
    this.opportunityDetailViewModel = opportunityDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.opportunityStore.getDetail(
      this.opportunityDetailViewModel.formPropsData[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetOpportunitySuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  getStageList = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.opportunityStore.getStageList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.opportunityStore.createOpportunity(
      this.opportunityDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.opportunityStore.updateOpportunity(
      this.opportunityDetailViewModel.formPropsData,
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
    if (result?.stageListItems) {
      this.stageListItems = result.stageListItems;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetOpportunitySuccessHandler = (result) => {
    if (result) {
      this.opportunityDetailViewModel.formPropsData = {
        ...this.opportunityDetailViewModel.formPropsData,
        ...Object.keys(CRM_OPPORTUNITY_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [CRM_OPPORTUNITY_DETAIL_FIELD_KEY[index]]:
                result[CRM_OPPORTUNITY_DETAIL_FIELD_KEY[index]],
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
        this.opportunityDetailViewModel.formPropsData[key] = {};
        Object.assign(this.opportunityDetailViewModel.formPropsData[key], value);
      } else {
        this.opportunityDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default OpportunityDetailViewModel;
