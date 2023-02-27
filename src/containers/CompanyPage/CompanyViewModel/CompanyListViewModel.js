/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { CRM_COMPANY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';
class CompanyListViewModel {
  companyStore = null;
  formStatus = PAGE_STATUS.READY;
  companyListViewModel = null;
  items = [];
  filter = {};
  successResponse = {
    state: false,
    content_id: '',
    listPublishStatus: [],
    1: [],
    filters: {
      'list[limit]': 10,
    },
    listCompaniesWithoutPagination: [],
  };

  constructor(companyStore) {
    makeAutoObservable(this);
    this.companyStore = companyStore;
  }

  setForm = (companyListViewModel) => {
    this.companyListViewModel = companyListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;

    await this.companyStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );
    this.successResponse.state = true;
  };

  getListPublishStatus = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.companyStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  initializeDataCustom = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.companyStore.getList(
      this.callbackOnSuccessHandlerCustom,
      this.callbackOnErrorHandler,
      this.filter
    );
  };
  callbackOnSuccessHandlerCustom = (result) => {
    this.items = result.listItems;
    this.formStatus = PAGE_STATUS.READY;
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

    await this.companyStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.companyStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.companyStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  deleteCompanies = async (arr) => {
    const res = await this.companyStore.deleteCompanies(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.companyStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  handleFilter = (filter) => {
    this.filter = { ...this.filter, ...filter };
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
      this.successResponse.pagination = result.pagination;
    }

    if (result?.listPublishStatus) {
      this.successResponse.listPublishStatus = result.listPublishStatus;
    }
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessGetCompaniesHandler = (result) => {
    this.successResponse.listCompaniesWithoutPagination = result.listItems.map((o) => {
      let dash = '';
      for (let index = 1; index < o.level; index++) {
        dash += '- ';
      }
      return { value: o.id, label: `${dash}${o.title}` };
    });
  };

  transform = (data) => {
    return data.map((o) => {
      const date =
        o[CRM_COMPANY_DETAIL_FIELD_KEY.MODIFIED_TIME] &&
        moment(o[CRM_COMPANY_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        id: o[CRM_COMPANY_DETAIL_FIELD_KEY.ID],
        company: {
          id: o[CRM_COMPANY_DETAIL_FIELD_KEY.ID],
          name: o[CRM_COMPANY_DETAIL_FIELD_KEY.NAME],
        },
        lastModified: {
          status: o[CRM_COMPANY_DETAIL_FIELD_KEY.STATUS],
          date: date ?? '',
          by: o[CRM_COMPANY_DETAIL_FIELD_KEY.MODIFIED_BY] ?? '',
        },
        createDate:
          o[CRM_COMPANY_DETAIL_FIELD_KEY.CREATED_TIME] &&
          moment(o[CRM_COMPANY_DETAIL_FIELD_KEY.CREATED_TIME]).format('DD MMM, YYYY'),
        status: o[CRM_COMPANY_DETAIL_FIELD_KEY.STATUS],
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default CompanyListViewModel;
