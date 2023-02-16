/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class ContactDetailViewModel {
  contactStore = null;
  formStatus = PAGE_STATUS.READY;
  contactDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(contactStore) {
    makeAutoObservable(this);
    this.contactStore = contactStore;
  }

  setForm = (contactDetailViewModel) => {
    this.contactDetailViewModel = contactDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactStore.getDetail(
      this.contactDetailViewModel.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetContactSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return this.contactStore.create(
      this.contactDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.contactStore.update(
      this.contactDetailViewModel.formPropsData,
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

  callbackOnGetContactSuccessHandler = (result) => {
    if (result) {
      this.contactDetailViewModel.formPropsData = {
        ...this.contactDetailViewModel.formPropsData,
        ...Object.keys(PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]:
                result[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]],
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
        Object.assign(this.contactDetailViewModel.formPropsData[key], value);
      } else {
        this.contactDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default ContactDetailViewModel;
