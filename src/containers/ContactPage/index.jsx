import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { ContactViewModelContextProvider } from './ContactViewModel/ContactViewModelContextProvider';
import ContactStore from 'containers/ContactPage/ContactStore/ContactStore';
import ContactListViewModel from 'containers/ContactPage/ContactViewModel/ContactListViewModel';
import ListContact from './Component/ListContact';

const contactStore = new ContactStore();
const contactListViewModel = new ContactListViewModel(contactStore);

const ContactPage = observer(
  class FieldPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <ContactViewModelContextProvider viewModel={contactListViewModel}>
            <ListContact />
          </ContactViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ContactPage);
