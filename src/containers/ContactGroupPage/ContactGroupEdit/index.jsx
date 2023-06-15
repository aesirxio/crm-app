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
import { withContactGroupViewModel } from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { CRM_LIST_GROUP_DETAIL_FIELD_KEY } from 'aesirx-lib';
import SimpleReactValidator from 'simple-react-validator';
import ContactGroupInformation from './Component/ContactGroupInformation';
import EditHeader from 'components/EditHeader';
import ContactStore from 'containers/ContactPage/ContactStore/ContactStore';
import ContactViewModel from 'containers/ContactPage/ContactViewModel/ContactViewModel';
import { historyPush } from 'routes/routes';

const contactStore = new ContactStore();
const contactViewModel = new ContactViewModel(contactStore);
const EditContactGroup = observer(
  class EditContactGroup extends Component {
    contactGroupDetailViewModel = null;
    formPropsData = {};
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.contactGroupDetailViewModel = this.viewModel
        ? this.viewModel.getContactGroupDetailViewModel()
        : null;
      this.contactListViewModel = contactViewModel
        ? contactViewModel.getContactListViewModel()
        : null;
      this.contactGroupDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[CRM_LIST_GROUP_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.contactGroupDetailViewModel.initializeData();
      }
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

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {(this.contactGroupDetailViewModel.formStatus === PAGE_STATUS.LOADING ||
            this.contactListViewModel.formStatus === PAGE_STATUS.LOADING) && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_group')}
              isEdit={this.isEdit}
              redirectUrl={'/contact-groups'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      historyPush(`/contact-groups`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_save_close'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.contactGroupDetailViewModel.update()
                          : await this.contactGroupDetailViewModel.create();
                        if (result !== 0) {
                          historyPush(`/contact-groups`);
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
                          await this.contactGroupDetailViewModel.update();
                          await this.contactGroupDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.contactGroupDetailViewModel.create();
                          result && historyPush(`/contact-groups/edit/${result}`);
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
                <ContactGroupInformation
                  validator={this.validator}
                  formPropsData={
                    this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData
                  }
                  contactListViewModel={this.contactListViewModel}
                  requiredField={this.state.requiredField}
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.contactGroupDetailViewModel}
                  formPropsData={
                    this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData
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

export default withTranslation()(withRouter(withContactGroupViewModel(EditContactGroup)));
