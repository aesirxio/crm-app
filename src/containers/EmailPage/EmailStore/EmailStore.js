/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import {
  AesirxCrmEmailMarketingApiService,
  CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY,
} from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class emailStore {
  async create(createEmailData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;

      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();

      resultOnSave = await aesirxCrmEmailApiService.create(createEmailData);
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

  async sendTest(createEmailData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;

      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();

      resultOnSave = await aesirxCrmEmailApiService.sendTest(createEmailData);
      if (resultOnSave?.result) {
        let receiversTest = createEmailData[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST]
          ?.map((item) => (item?.email ? item?.email : item?.value))
          ?.join('; ');
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, `Send test to ${receiversTest} successfully`);
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
      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();

      resultOnSave = await aesirxCrmEmailApiService.update(updateEmailData);

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
        const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();

        const respondedData = await aesirxCrmEmailApiService.getDetail(id);

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
      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();
      const respondedData = await aesirxCrmEmailApiService.getList(filters);
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
      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();
      const respondedData = await aesirxCrmEmailApiService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();
      const respondedData = await aesirxCrmEmailApiService.updateStatus(arr, status);
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
      const aesirxCrmEmailApiService = new AesirxCrmEmailMarketingApiService();
      const respondedData = await aesirxCrmEmailApiService.delete(arr);
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
