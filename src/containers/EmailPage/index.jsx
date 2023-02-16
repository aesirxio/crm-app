import React from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import EmailStore from './EmailStore/EmailStore';
import EmailListViewModel from './EmailViewModel/EmailListViewModel';
import { EmailViewModelContextProvider } from './EmailViewModel/EmailViewModelContextProvider';
import ListEmail from './Component/ListEmail';

const emailStore = new EmailStore();
const emailListViewModel = new EmailListViewModel(emailStore);

const EmailsPage = observer(
  class EmailsPage extends React.Component {
    formPropsData = null;
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="px-3 py-4">
          <EmailViewModelContextProvider viewModel={emailListViewModel}>
            <ListEmail />
          </EmailViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(EmailsPage);
