/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimFieldGroupApiService } from 'aesirx-dma-lib';
import { FieldGroupItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class ContactGroupStore {
  async create(createContactGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfCreation(createContactGroupData);

      let resultOnSave;
      const createContactGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await createContactGroupApiService.create(convertedUpdateGeneralData);
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
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfUpdation(updateContactGroupData);

      let resultOnSave;
      const updateContactGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await updateContactGroupApiService.update(convertedUpdateGeneralData);
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
      const updateStatusAPIService = new AesirxPimFieldGroupApiService();
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
        const getDetailInfoAPIService = new AesirxPimFieldGroupApiService();

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
      const getListInfoAPIService = new AesirxPimFieldGroupApiService();
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
}
