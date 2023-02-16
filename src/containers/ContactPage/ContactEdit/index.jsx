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
import { withContactViewModel } from 'containers/ContactPage/ContactViewModel/ContactViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import ContactInformation from './Component/ContactInformation';
import EditHeader from 'components/EditHeader';

const EditContact = observer(
  class EditContact extends Component {
    contactDetailViewModel = null;
    formPropsData = { [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };

    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.state = {};

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.contactDetailViewModel = this.viewModel
        ? this.viewModel.getContactDetailViewModel()
        : null;
      this.contactDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.contactDetailViewModel.initializeData();
      }
    }

    render() {
      const { t } = this.props;
      let history = this.props.history;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.contactDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
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
                      history.push(`/contacts`);
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
                          history.push(`/contacts`);
                        }
                      } else {
                        this.validator.showMessages();
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
                          result && history.push(`/contacts/edit/${result}`);
                        }
                      } else {
                        this.validator.showMessages();
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
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.contactDetailViewModel.contactDetailViewModel.formPropsData[
                          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_contact_name'),
                      handleChange: (event) => {
                        this.contactDetailViewModel.handleFormPropsData(
                          PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE,
                          event.target.value
                        );
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Contact Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Contact Name',
                    this.contactDetailViewModel.contactDetailViewModel.formPropsData[
                      PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <ContactInformation validator={this.validator} />
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

export default withTranslation('common')(withRouter(withContactViewModel(EditContact)));
