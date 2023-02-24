/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxCrmEmailMarketingApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class emailStore {
  async create(createEmailData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;

      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();

      resultOnSave = await aesirxPimEmailApiService.create(createEmailData);
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
      let resultOnSave;
      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();

      resultOnSave = await aesirxPimEmailApiService.update(updateEmailData);

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
        const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();

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

  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();
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
      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();
      const respondedData = await aesirxPimEmailApiService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();
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
      const aesirxPimEmailApiService = new AesirxCrmEmailMarketingApiService();
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
