/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import ContactStore from 'containers/ContactPage/ContactStore/ContactStore';
import ContactViewModel from 'containers/ContactPage/ContactViewModel/ContactViewModel';
import { ContactViewModelContextProvider } from 'containers/ContactPage/ContactViewModel/ContactViewModelContextProvider';
import EditContact from './ContactEdit';
const contactStore = new ContactStore();
const contactViewModel = new ContactViewModel(contactStore);

const EditContactProvider = observer(
  class EditContactProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <ContactViewModelContextProvider viewModel={contactViewModel}>
          <EditContact />
        </ContactViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditContactProvider);
