/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimCategoryApiService } from 'aesirx-dma-lib';
import { AesirxPimProductApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { ProductItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class emailStore {
  async create(createEmailData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfCreation(createEmailData);

      let resultOnSave;

      const aesirxPimEmailApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimEmailApiService.create(convertedUpdateGeneralData);
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

  async update(updateEmailData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfUpdation(updateEmailData);
      let resultOnSave;
      const aesirxPimEmailApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimEmailApiService.update(convertedUpdateGeneralData);

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

  async getEmailDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const aesirxPimEmailApiService = new AesirxPimProductApiService();

        const respondedData = await aesirxPimEmailApiService.getDetail(id);

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

  async getListCategories(callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimCategoryApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCategoryApiService.getList({ 'list[limit]': 9999 });

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

  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const aesirxPimEmailApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimEmailApiService.getList(filters);
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
      const aesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await aesirxPimUtilApiService.getListPublishStatus();
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

  async getDetailEmail(id) {
    if (!id) return false;

    try {
      const aesirxPimEmailApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimEmailApiService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimEmailApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimEmailApiService.updateStatus(arr, status);
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

  async deleteEmails(arr, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimEmailApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimEmailApiService.deleteEmails(arr);
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
