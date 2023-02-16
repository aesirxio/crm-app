/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class ContactGroupDetailViewModel {
  contactGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  contactGroupDetailViewModel = null;
  aliasChange = '';
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(contactGroupStore) {
    makeAutoObservable(this);
    this.contactGroupStore = contactGroupStore;
  }

  setForm = (contactGroupDetailViewModel) => {
    this.contactGroupDetailViewModel = contactGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactGroupStore.getDetail(
      this.contactGroupDetailViewModel.formPropsData[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetContactGroupSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.contactGroupStore.create(
      this.contactGroupDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.contactGroupStore.update(
      this.contactGroupDetailViewModel.formPropsData,
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

  callbackOnGetContactGroupSuccessHandler = (result) => {
    if (result) {
      this.contactGroupDetailViewModel.formPropsData = {
        ...this.contactGroupDetailViewModel.formPropsData,
        ...Object.keys(PIM_FIELD_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FIELD_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_FIELD_GROUP_DETAIL_FIELD_KEY[index]],
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
        Object.assign(this.contactGroupDetailViewModel.formPropsData[key], value);
      } else {
        this.contactGroupDetailViewModel.formPropsData[key] = value;
      }
    }
  };

  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default ContactGroupDetailViewModel;
