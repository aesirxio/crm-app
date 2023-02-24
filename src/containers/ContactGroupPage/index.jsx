/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import ContactGroupStore from 'containers/ContactGroupPage/ContactGroupStore/ContactGroupStore';
import ContactGroupListViewModel from './ContactGroupViewModel/ContactGroupListViewModel';
import ListContactGroup from './Component/ListContactGroup';
import { ContactGroupViewModelContextProvider } from './ContactGroupViewModel/ContactGroupViewModelContextProvider';
const contactGroupStore = new ContactGroupStore();
const contactGroupListViewModel = new ContactGroupListViewModel(contactGroupStore);

const ContactGroupPage = observer(
  class ContactGroupPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ContactGroupViewModelContextProvider viewModel={contactGroupListViewModel}>
            <ListContactGroup />
          </ContactGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ContactGroupPage);
