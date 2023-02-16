/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import ContactGroupStore from 'containers/ContactGroupPage/ContactGroupStore/ContactGroupStore';
import ContactGroupViewModel from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModel';
import { ContactGroupViewModelContextProvider } from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModelContextProvider';
import EditContactGroup from './ContactGroupEdit';
const contactGroupStore = new ContactGroupStore();
const contactGroupViewModel = new ContactGroupViewModel(contactGroupStore);

const EditContactGroupProvider = observer(
  class EditContactGroupProvider extends Component {
    render() {
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <ContactGroupViewModelContextProvider viewModel={contactGroupViewModel}>
          <EditContactGroup />
        </ContactGroupViewModelContextProvider>
      );
    }
  }
);
export default withTranslation('common')(EditContactGroupProvider);
