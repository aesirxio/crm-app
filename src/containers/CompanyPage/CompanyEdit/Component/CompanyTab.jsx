import React, { Component } from 'react';
import { Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import CompanyInformation from './CompanyInformation';
const CompanyTab = observer(
  class CompanyTab extends Component {
    groupList = [];
    constructor(props) {
      super(props);
      this.detailViewModal = this.props.detailViewModal;
      this.state = {
        defaultActive: 'companyInformation',
      };
    }

    componentDidUpdate(prevProps) {
      if (this.props.requiredField !== prevProps.requiredField) {
        this.handleActiveTabRequiredField();
      }
    }

    handleActiveTabRequiredField() {
      if (this.props.requiredField) {
        this.setState({
          defaultActive: 'customFields',
        });
      }
    }

    render() {
      const { validator } = this.props;
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          <Tab.Container
            id="left-tabs-fields"
            activeKey={`${this.state.defaultActive}`}
            onSelect={(key) => {
              this.setState({
                defaultActive: key,
              });
            }}
          >
            <CompanyInformation validator={validator} />
          </Tab.Container>
        </div>
      );
    }
  }
);
export default withTranslation('common')(CompanyTab);
