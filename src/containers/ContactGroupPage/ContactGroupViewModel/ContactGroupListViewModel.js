/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from 'aesirx-uikit';
import { CRM_LIST_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';

class ContactGroupListViewModel {
  contactGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  contactGroupListViewModel = null;
  items = [];
  filter = {
    'list[limit]': 10,
  };
  pagination = {};
  successResponse = {
    state: false,
    listPublishStatus: [],
    content_id: '',
  };

  constructor(contactGroupStore) {
    makeAutoObservable(this);
    this.contactGroupStore = contactGroupStore;
  }

  setForm = (contactGroupListViewModel) => {
    this.contactGroupListViewModel = contactGroupListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  getListPublishStatus = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contactGroupStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
  };

  clearFilter = () => {
    this.filter = {
      'list[limit]': 10,
    };
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

    await this.contactGroupStore.getList(
      this.filter,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.contactGroupStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.contactGroupStore.getList(
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
      this.items = result.listItems;
      this.pagination = result.pagination;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  transform = (data) => {
    return data.map((o) => {
      const date = moment(o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        id: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.ID],
        contactGroups: {
          name: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.NAME],
          id: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.ID],
        },
        numberContact: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS]?.length ?? 0,
        createDate: {
          date:
            o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.CREATED_TIME] &&
            moment(o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.CREATED_TIME]).format('DD MMM, YYYY'),
          by: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.CREATED_BY],
        },
        status: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.STATUS],
        lastModified: {
          status: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.STATUS],
          date: date ?? '',
          by: o[CRM_LIST_GROUP_DETAIL_FIELD_KEY.MODIFIED_BY],
        },
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };

  deleteContactGroups = async (arr) => {
    const res = await this.contactGroupStore.deleteContactGroups(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.contactGroupStore.getList(
        this.filter,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler
      );
    }
    this.successResponse.state = true;
  };
}

export default ContactGroupListViewModel;
