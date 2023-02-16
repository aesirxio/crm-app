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
import '../index.scss';
import ActionsBar from 'components/ActionsBar';
import CommonInformation from './Component/CommonInformation';
import { withEmailViewModel } from 'containers/EmailPage/EmailViewModel/EmailViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_FIELD_DETAIL_FIELD_KEY, PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import CategoryStore from 'containers/CompanyPage/CompanyStore/CompanyStore';
import CategoryViewModel from 'containers/CompanyPage/CompanyViewModel/CompanyViewModel';
import _ from 'lodash';
import EditHeader from 'components/EditHeader';
const categoryStore = new CategoryStore();
const categoryViewModel = new CategoryViewModel(categoryStore);
const EditEmail = observer(
  class EditEmail extends Component {
    emailDetailViewModel = null;
    formPropsData = { [PIM_FIELD_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: {} };
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = { key: 'commonInformation', requiredField: '' };
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.emailDetailViewModel = this.viewModel ? this.viewModel.getEmailDetailViewModel() : null;
      this.categoryListViewModel = categoryViewModel
        ? categoryViewModel.getCategoryListViewModel()
        : null;
      this.emailDetailViewModel.setForm(this);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.emailDetailViewModel.initializeData();
      }
      await this.categoryListViewModel.handleFilter({ limit: 0 });
      await this.categoryListViewModel.initializeDataCustom();
    }

    handleAliasFormPropsData() {
      if (
        !this.emailDetailViewModel.emailDetailViewModel.formPropsData[
          PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
        ]
      ) {
        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
          PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
        ] = this.emailDetailViewModel.aliasChange;
      }
    }
    debouncedChangeHandler = _.debounce((value) => {
      this.emailDetailViewModel.handleAliasChange(value);
    }, 300);

    handleValidateForm() {
      if (this.validator.fields['Email Name'] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            key: 'fields',
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
    }

    render() {
      const { t, history } = this.props;
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.emailDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <EditHeader
              props={this.props}
              title={t('txt_email')}
              isEdit={this.isEdit}
              redirectUrl={'/email/all'}
            />
            <div className="position-relative">
              <ActionsBar
                buttons={[
                  {
                    title: t('txt_cancel'),
                    handle: async () => {
                      history.push(`/email/all`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_preview'),
                    handle: () => {},
                    icon: '/assets/images/preview.svg',
                  },
                  {
                    title: t('txt_send_a_test'),
                    handle: () => {},
                  },
                  {
                    title: t('txt_send_email'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        this.handleAliasFormPropsData();
                        if (this.isEdit) {
                          await this.emailDetailViewModel.update();
                          await this.emailDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.emailDetailViewModel.create();
                          result && history.push(`/email/edit/${result}`);
                        }
                      } else {
                        this.handleValidateForm();
                      }
                    },
                    icon: '/assets/images/send-email.png',
                    variant: 'success',
                  },
                ]}
              />
            </div>
          </div>
          <Form>
            <Row className="gx-24 mb-24">
              <Col xxl={9} lg={8}>
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_mail_name'),
                      handleChange: (event) => {
                        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                          PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                        ] = event.target.value;
                        if (
                          !this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                            PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS
                          ]
                        ) {
                          this.debouncedChangeHandler(event.target.value);
                        }
                      },
                      required: true,
                      blurred: () => {
                        this.validator.showMessageFor('Email Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Email Name',
                    this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                      PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>
                <CommonInformation
                  formPropsData={this.formPropsData}
                  validator={this.validator}
                  categoryListViewModel={this.categoryListViewModel}
                />
              </Col>
              <Col xxl={3} lg={4}>
                <PublishOptions
                  detailViewModal={this.emailDetailViewModel}
                  formPropsData={this.emailDetailViewModel.emailDetailViewModel.formPropsData}
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

export default withTranslation('common')(withRouter(withEmailViewModel(EditEmail)));
