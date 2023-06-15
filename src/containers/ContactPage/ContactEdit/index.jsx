/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Spinner } from 'aesirx-uikit';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ActionsBar from 'components/ActionsBar';
import { withContactViewModel } from 'containers/ContactPage/ContactViewModel/ContactViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { CRM_CONTACT_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import ContactInformation from './Component/ContactInformation';
import EditHeader from 'components/EditHeader';
import CompanyStore from 'containers/CompanyPage/CompanyStore/CompanyStore';
import CompanyViewModel from 'containers/CompanyPage/CompanyViewModel/CompanyViewModel';
import ContactGroupStore from 'containers/ContactGroupPage/ContactGroupStore/ContactGroupStore';
import ContactGroupViewModel from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModel';
import { historyPush } from 'routes/routes';

const companyStore = new CompanyStore();
const companyViewModel = new CompanyViewModel(companyStore);
const contactGroupStore = new ContactGroupStore();
const contactGroupViewModel = new ContactGroupViewModel(contactGroupStore);
const EditContact = observer(
  class EditContact extends Component {
    contactDetailViewModel = null;
    formPropsData = {};

    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.contactDetailViewModel = this.viewModel
        ? this.viewModel.getContactDetailViewModel()
        : null;
      this.companyListViewModel = companyViewModel
        ? companyViewModel.getCompanyListViewModel()
        : null;
      this.contactGroupListViewModel = contactGroupViewModel
        ? contactGroupViewModel.getContactGroupListViewModel()
        : null;
      this.contactDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[CRM_CONTACT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.contactDetailViewModel.initializeData();
      }
      await this.contactDetailViewModel.getStatusList();
      await this.companyListViewModel.handleFilter({ limit: 0, 'filter[state]': 1 });
      await this.companyListViewModel.initializeDataCustom();
      await this.contactGroupListViewModel.handleFilter({ limit: 0, 'filter[state]': 1 });
      await this.contactGroupListViewModel.initializeData();
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

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {(this.contactDetailViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.companyListViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.contactGroupListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_contact')}
              isEdit={this.isEdit}
              redirectUrl={'/contacts'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/contacts`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.contactDetailViewModel.update()
                          : await this.contactDetailViewModel.create();
                        if (result !== 0) {
                          historyPush(`/contacts`);
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
                          await this.contactDetailViewModel.update();
                          await this.contactDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.contactDetailViewModel.create();
                          result && historyPush(`/contacts/edit/${result}`);
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
                <ContactInformation
                  validator={this.validator}
                  companyListViewModel={this.companyListViewModel}
                  contactGroupListViewModel={this.contactGroupListViewModel}
                  requiredField={this.state.requiredField}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.contactDetailViewModel}
                  formPropsData={this.contactDetailViewModel.contactDetailViewModel.formPropsData}
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

export default withTranslation()(withRouter(withContactViewModel(EditContact)));
