/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY } from 'aesirx-lib';
import moment from 'moment';
import { notify } from 'aesirx-uikit';
class EmailListViewModel {
  emailStore = null;
  formStatus = PAGE_STATUS.READY;
  items = [];
  successResponse = {
    state: false,
    filters: {
      'list[limit]': 10,
    },
    listPublishStatus: [],
    listEmail: [],
    pagination: {},
  };

  constructor(emailStore) {
    makeAutoObservable(this);
    this.emailStore = emailStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.emailStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    await this.emailStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  setFeatured = async (id, featured = 0) => {
    await this.emailStore.update(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessSetFeatured,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  getListByFilter = async (key, value) => {
    value ? (this.successResponse.filters[key] = value) : delete this.successResponse.filters[key];

    //pagination
    if (key != 'list[start]' && key != 'list[limit]') {
      delete this.successResponse.filters['list[start]'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[start]'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[start]'] =
          (this.successResponse.pagination.page - 1) * value;
      }
    }

    await this.emailStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.emailStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.emailStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  deleteEmails = async (arr) => {
    const res = await this.emailStore.deleteEmails(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.emailStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  callbackOnSuccessSetFeatured = async (result, message) => {
    this.successResponse.listEmail = this.successResponse.listEmail.map((o) => {
      if (o.id == result) {
        return { ...o, featured: !o.featured };
      }
      return o;
    });
    if (result && message) {
      notify(message, 'success');
    }
  };

  callbackOnSuccessHandler = (result, message) => {
    if (result?.listItems) {
      this.successResponse.listEmail = this.transform(result.listItems);
      this.successResponse.pagination = result.pagination;
      // Need improve response
      this.items = result.listItems;
    }
    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    error._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
  };

  transform = (data) => {
    return data.map((o) => {
      const date =
        CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.MODIFIED_TIME &&
        moment(o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');

      return {
        id: o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.ID],
        name: o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.NAME],
        createDate:
          o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.CREATED_TIME] &&
          moment(o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.CREATED_TIME]).format('DD MMM, YYYY'),
        sendDate: date ?? '',
        author: o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.CREATED_BY],
        status: o[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.STATUS],
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default EmailListViewModel;
