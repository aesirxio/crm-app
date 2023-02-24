/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxCrmContactApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class ContactStore {
  async create(createContactData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const createContactApiService = new AesirxCrmContactApiService();

      resultOnSave = await createContactApiService.create(createContactData);
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

  async update(updateContactData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const updateContactApiService = new AesirxCrmContactApiService();

      resultOnSave = await updateContactApiService.update(updateContactData);
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
        const getDetailInfoAPIService = new AesirxCrmContactApiService();

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

  async getList(filter, callbackOnSuccess, callbackOnError) {
    try {
      const getListInfoAPIService = new AesirxCrmContactApiService();
      const respondedData = await getListInfoAPIService.getList(filter);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }
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
      const updateStatusAPIService = new AesirxCrmContactApiService();
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

  async deleteContacts(arr, callbackOnSuccess, callbackOnError) {
    try {
      const getAesirxCrmContactApiService = new AesirxCrmContactApiService();
      const respondedData = await getAesirxCrmContactApiService.deleteContacts(arr);
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

  async getStatusList(callbackOnSuccess, callbackOnError) {
    try {
      const getListAPIService = new AesirxCrmContactApiService();
      const respondedData = await getListAPIService.getStatusList();
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
}
