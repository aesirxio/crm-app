/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxCrmOpportunityApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class OpportunityStore {
  async createOpportunity(createOpportunityData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const createOpportunityApiService = new AesirxCrmOpportunityApiService();

      resultOnSave = await createOpportunityApiService.create(createOpportunityData);
      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Created successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }

  async updateOpportunity(updateOpportunityData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;

      const updateOpportunityApiService = new AesirxCrmOpportunityApiService();
      resultOnSave = await updateOpportunityApiService.update(updateOpportunityData);

      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Updated successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }

  async getDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxCrmOpportunityApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }
  }

  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListAPIService = new AesirxCrmOpportunityApiService();
      const respondedData = await getListAPIService.getList(filters);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }

    return false;
  }

  async getListWithoutPagination(callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimOpportunityApiService = new AesirxCrmOpportunityApiService();
      const respondedData = await aesirxPimOpportunityApiService.getList({ 'list[limit]': 9999 });

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async getListPublishStatus(callbackOnSuccess, callbackOnError) {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const updateStatusAPIService = new AesirxCrmOpportunityApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      runInAction(() => {
        callbackOnSuccess(respondedData, 'Updated successfully');
      });
      return respondedData;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }

    return false;
  }

  async deleteOpportunities(arr, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimOpportunityApiService = new AesirxCrmOpportunityApiService();
      const respondedData = await aesirxPimOpportunityApiService.deleteOpportunities(arr);
      runInAction(() => {
        callbackOnSuccess(respondedData, 'Deleted successfully');
      });
      return respondedData;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }

    return false;
  }
}
