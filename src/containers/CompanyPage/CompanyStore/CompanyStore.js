/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimCategoryApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { CategoryItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class CompanyStore {
  async createCompany(createCompanyData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfCreation(createCompanyData);
      let resultOnSave;
      const createCompanyApiService = new AesirxPimCategoryApiService();

      resultOnSave = await createCompanyApiService.create(convertedUpdateGeneralData);
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

  async updateCompany(updateCompanyData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfUpdation(updateCompanyData);

      let resultOnSave;

      const updateCompanyApiService = new AesirxPimCategoryApiService();
      resultOnSave = await updateCompanyApiService.update(convertedUpdateGeneralData);

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
        const getDetailInfoAPIService = new AesirxPimCategoryApiService();

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
      const getListAPIService = new AesirxPimCategoryApiService();
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
      const aesirxPimCompanyApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCompanyApiService.getList({ 'list[limit]': 9999 });

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
      const updateStatusAPIService = new AesirxPimCategoryApiService();
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

  async deleteCompanies(arr, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimCompanyApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCompanyApiService.deleteCompanies(arr);
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
