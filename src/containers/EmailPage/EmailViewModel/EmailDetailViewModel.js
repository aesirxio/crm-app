/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class EmailDetailViewModel {
  emailStore = null;
  formStatus = PAGE_STATUS.READY;
  emailDetailViewModel = null;
  aliasChange = '';
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(emailStore) {
    makeAutoObservable(this);
    this.emailStore = emailStore;
  }

  setForm = (emailDetailViewModel) => {
    this.emailDetailViewModel = emailDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.emailStore.getEmailDetail(
      this.emailDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetEmailSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.emailStore.create(
      this.emailDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.emailStore.update(
      this.emailDetailViewModel.formPropsData,
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
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetEmailSuccessHandler = (result) => {
    if (result) {
      this.emailDetailViewModel.formPropsData = {
        ...this.emailDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRODUCT_DETAIL_FIELD_KEY[index]]: result[PIM_PRODUCT_DETAIL_FIELD_KEY[index]],
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
        Object.assign(this.emailDetailViewModel.formPropsData[key], value);
      } else {
        this.emailDetailViewModel.formPropsData[key] = value;
      }
    }
  };

  handleAliasChange = (value) => {
    this.aliasChange = value?.replace(/ /g, '-').toString().toLowerCase();
  };
}

export default EmailDetailViewModel;
