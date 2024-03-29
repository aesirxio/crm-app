/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxCrmListGroupApiService, AesirxPimUtilApiService } from 'aesirx-lib';
import { runInAction } from 'mobx';

export default class ContactGroupStore {
  async create(createContactGroupData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const createContactGroupApiService = new AesirxCrmListGroupApiService();

      resultOnSave = await createContactGroupApiService.create(createContactGroupData);
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

  async update(updateContactGroupData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const updateContactGroupApiService = new AesirxCrmListGroupApiService();

      resultOnSave = await updateContactGroupApiService.update(updateContactGroupData);
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

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const updateStatusAPIService = new AesirxCrmListGroupApiService();
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

  async getDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxCrmListGroupApiService();

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
      const getListInfoAPIService = new AesirxCrmListGroupApiService();
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
  async deleteContactGroups(arr, callbackOnSuccess, callbackOnError) {
    try {
      const getAesirxCrmContactApiService = new AesirxCrmListGroupApiService();
      const respondedData = await getAesirxCrmContactApiService.delete(arr);
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
