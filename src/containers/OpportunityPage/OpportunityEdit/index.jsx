/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import Spinner from '../../../components/Spinner';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import { withOpportunityViewModel } from 'containers/OpportunityPage/OpportunityViewModel/OpportunityViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { CRM_OPPORTUNITY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import SimpleReactValidator from 'simple-react-validator';
import EditHeader from 'components/EditHeader';
import OpportunityInformation from './Component/OpportunityInformation';
import CompanyStore from 'containers/CompanyPage/CompanyStore/CompanyStore';
import CompanyViewModel from 'containers/CompanyPage/CompanyViewModel/CompanyViewModel';
import ContactStore from 'containers/ContactPage/ContactStore/ContactStore';
import ContactViewModel from 'containers/ContactPage/ContactViewModel/ContactViewModel';
const companyStore = new CompanyStore();
const companyViewModel = new CompanyViewModel(companyStore);
const contactStore = new ContactStore();
const contactViewModel = new ContactViewModel(contactStore);
const EditOpportunity = observer(
  class EditOpportunity extends Component {
    opportunityDetailViewModel = null;
    formPropsData = { [CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.opportunityDetailViewModel = this.viewModel
        ? this.viewModel.getOpportunityDetailViewModel()
        : null;
      this.opportunityDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;

      this.companyListViewModel = companyViewModel
        ? companyViewModel.getCompanyListViewModel()
        : null;

      this.contactListViewModel = contactViewModel
        ? contactViewModel.getContactListViewModel()
        : null;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.opportunityDetailViewModel.initializeData();
      }
      await this.opportunityDetailViewModel.getStageList();
      await this.companyListViewModel.handleFilter({ limit: 0, 'filter[state]': 1 });
      await this.companyListViewModel.initializeDataCustom();
      await this.contactListViewModel.handleFilter({ limit: 0, 'filter[state]': 1 });
      await this.contactListViewModel.initializeData();
    }

    handleValidateForm() {
      this.setState((prevState) => {
        return {
          ...prevState,
          requiredField: Math.random(1, 200),
        };
      });
      this.validator.showMessages();
    }

    render() {
      const { t } = this.props;
      let history = this.props.history;
      console.log('rerender Opportunity');
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.opportunityDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_opportunity')}
              isEdit={this.isEdit}
              redirectUrl={'/opportunity'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/opportunity`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  // {
                  //   title: t('txt_preview'),
                  //   handle: () => {},
                  //   icon: '/assets/images/preview.svg',
                  // },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.opportunityDetailViewModel.update()
                          : await this.opportunityDetailViewModel.create();
                        if (result !== 0) {
                          history.push(`/opportunity`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                  },
                  {
                    title: t('txt_save'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.opportunityDetailViewModel.update();
                          await this.opportunityDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.opportunityDetailViewModel.create();
                          result && history.push(`/opportunity/edit/${result}`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                    icon: '/assets/images/save.svg',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <Form>
            <Row className="gx-24 mb-24">
              <Col lg={9}>
                <OpportunityInformation
                  validator={this.validator}
                  formPropsData={
                    this.opportunityDetailViewModel.opportunityDetailViewModel.formPropsData
                  }
                  companyListViewModel={this.companyListViewModel}
                  contactListViewModel={this.contactListViewModel}
                  requiredField={this.state.requiredField}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.opportunityDetailViewModel}
                  formPropsData={
                    this.opportunityDetailViewModel.opportunityDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withOpportunityViewModel(EditOpportunity)));
