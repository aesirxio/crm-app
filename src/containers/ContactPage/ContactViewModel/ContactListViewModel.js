/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { CRM_CONTACT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';
class ContactListViewModel {
  contactStore = null;
  formStatus = PAGE_STATUS.READY;
  contactListViewModel = null;
  items = [];
  filter = {
    'list[limit]': 10,
  };
  pagination = {};
  listPublishStatus = [];
  successResponse = {
    state: false,
    content_id: '',
  };

  constructor(contactStore) {
    makeAutoObservable(this);
    this.contactStore = contactStore;
  }

  setForm = (contactListViewModel) => {
    this.contactListViewModel = contactListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  getListPublishStatus = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  getListByFilter = async (key, value) => {
    value ? (this.filter[key] = value) : delete this.filter[key];

    //pagination
    if (key != 'list[start]' && key != 'list[limit]') {
      delete this.filter['list[start]'];
    } else {
      if (key == 'list[limit]' && value * this.pagination.page >= this.pagination.totalItems) {
        this.filter['list[start]'] = Math.ceil(this.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.pagination.page < this.pagination.totalItems
      ) {
        this.filter['list[start]'] = (this.pagination.page - 1) * value;
      }
    }

    await this.contactStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.contactStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.contactStore.getList(
        this.filter,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler
      );
    }
    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  deleteContacts = async (arr) => {
    const res = await this.contactStore.deleteContacts(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.contactStore.getList(
        this.filter,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler
      );
    }
    this.successResponse.state = true;
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
    if (result?.listItems) {
      this.items = result.listItems.map((item) => {
        return { ...item, selected: false };
      });
      this.pagination = result.pagination;
    }
    if (result?.listPublishStatus) {
      this.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data) => {
    return data.map((o) => {
      const date =
        o[CRM_CONTACT_DETAIL_FIELD_KEY.MODIFIED_TIME] &&
        moment(o[CRM_CONTACT_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        id: o[CRM_CONTACT_DETAIL_FIELD_KEY.ID],
        name: o[CRM_CONTACT_DETAIL_FIELD_KEY.NAME],
        email: o[CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS],
        phone: o[CRM_CONTACT_DETAIL_FIELD_KEY.PHONE_NUMBER],
        createDate:
          o[CRM_CONTACT_DETAIL_FIELD_KEY.CREATED_TIME] &&
          moment(o[CRM_CONTACT_DETAIL_FIELD_KEY.CREATED_TIME]).format('DD MMM, YYYY'),
        lastModified: {
          status: o[CRM_CONTACT_DETAIL_FIELD_KEY.STATUS],
          date: date ?? '',
          by: o[CRM_CONTACT_DETAIL_FIELD_KEY.MODIFIED_BY],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default ContactListViewModel;
