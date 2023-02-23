/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { CRM_OPPORTUNITY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import moment from 'moment';
class OpportunityListViewModel {
  opportunityStore = null;
  formStatus = PAGE_STATUS.READY;
  opportunityListViewModel = null;
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
    listOpportunitiesWithoutPagination: [],
  };

  constructor(opportunityStore) {
    makeAutoObservable(this);
    this.opportunityStore = opportunityStore;
  }

  setForm = (opportunityListViewModel) => {
    this.opportunityListViewModel = opportunityListViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;

    await this.opportunityStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    await this.opportunityStore.getListWithoutPagination(
      this.callbackOnSuccessGetOpportunitiesHandler,
      this.callbackOnErrorHandler
    );

    await this.opportunityStore.getListPublishStatus(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  initializeDataCustom = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.opportunityStore.getList(
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
    if (key != 'list[limitstart]' && key != 'list[limit]') {
      delete this.successResponse.filters['list[limitstart]'];
    } else {
      if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page >= this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          Math.ceil(this.successResponse.pagination.totalItems / value - 1) * value;
      } else if (
        key == 'list[limit]' &&
        value * this.successResponse.pagination.page < this.successResponse.pagination.totalItems
      ) {
        this.successResponse.filters['list[limitstart]'] =
          (this.successResponse.pagination.page - 1) * value;
      }
    }

    await this.opportunityStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    this.successResponse.state = true;
  };

  setPublished = async (id, state = 0) => {
    await this.opportunityStore.updateOpportunity(
      { id: id.toString(), published: state.toString() },
      this.callbackOnSuccessSetPublished,
      this.callbackOnErrorHandler
    );

    await this.opportunityStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.successResponse.filters
    );

    this.successResponse.state = true;
  };

  updateStatus = async (arr, status = 0) => {
    const res = await this.opportunityStore.updateStatus(
      arr,
      status,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.opportunityStore.getList(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHandler,
        this.successResponse.filters
      );
    }
    this.successResponse.state = true;
  };

  deleteOpportunities = async (arr) => {
    const res = await this.opportunityStore.deleteOpportunities(
      arr,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    if (res) {
      await this.opportunityStore.getList(
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
      this.successResponse.listOpportunities = this.transform(result.listItems);
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

  callbackOnSuccessSetPublished = async (result, message) => {
    this.successResponse.listOpportunities = this.successResponse.listOpportunities.map((o) => {
      if (o.opportunity.id == result) {
        return { ...o, published: { ...o.published, state: !o.published.state } };
      }
      return o;
    });
    if (result && message) {
      notify(message, 'success');
    }
  };

  callbackOnSuccessGetOpportunitiesHandler = (result) => {
    this.successResponse.listOpportunitiesWithoutPagination = result.listItems.map((o) => {
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
        o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.MODIFIED_TIME] &&
        moment(o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.MODIFIED_TIME]).format('DD MMM, YYYY');
      return {
        id: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ID],
        opportunity: {
          id: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ID],
          name: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NAME],
        },
        companyName: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.COMPANY],
        contactName: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CONTACT],
        amount: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.BUDGET_AMOUNT],
        expectDate: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ENDING_DATE],
        assignedTo: 'Kanira Tr',
        saleStage: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.STAGE] ?? '',
        lastModified: {
          status: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.PUBLISHED],
          dateTime: date ?? '',
          author: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CREATED_BY],
        },
        status: o[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.STATUS],
      };
    });
  };

  isLoading = () => {
    this.successResponse.state = false;
  };
}

export default OpportunityListViewModel;
