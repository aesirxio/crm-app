/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import EmailStore from 'containers/EmailPage/EmailStore/EmailStore';
import EmailViewModel from 'containers/EmailPage/EmailViewModel/EmailViewModel';
import { EmailViewModelContextProvider } from 'containers/EmailPage/EmailViewModel/EmailViewModelContextProvider';
import EditEmail from './EmailEdit';
const emailStore = new EmailStore();
const emailViewModel = new EmailViewModel(emailStore);

const EditEmailProvider = observer(
  class EditEmailProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <EmailViewModelContextProvider viewModel={emailViewModel}>
          <EditEmail />
        </EmailViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditEmailProvider);
