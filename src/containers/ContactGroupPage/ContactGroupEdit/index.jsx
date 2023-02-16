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
import { withContactGroupViewModel } from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import ContactGroupInformation from './Component/ContactGroupInformation';
import _ from 'lodash';
import EditHeader from 'components/EditHeader';

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
      this.contactGroupDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.contactGroupDetailViewModel.initializeData();
      }
    }

    handleAliasFormPropsData() {
      if (
        !this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData[
          PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS
        ]
      ) {
        this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData[
          PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS
        ] = this.contactGroupDetailViewModel.aliasChange;
      }
    }

    debouncedChangeHandler = _.debounce((value) => {
      this.contactGroupDetailViewModel.handleAliasChange(value);
    }, 300);

    render() {
      const { t } = this.props;
      let history = this.props.history;

      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.contactGroupDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
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
                      history.push(`/contact-groups`);
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
                      this.handleAliasFormPropsData();
                      if (this.validator.allValid()) {
                        const result = this.isEdit
                          ? await this.contactGroupDetailViewModel.update()
                          : await this.contactGroupDetailViewModel.create();
                        if (result !== 0) {
                          history.push(`/contact-groups`);
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
                      this.handleAliasFormPropsData();
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.contactGroupDetailViewModel.update();
                          await this.contactGroupDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.contactGroupDetailViewModel.create();
                          history.push(`/contact-groups/edit/${result}`);
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
                        this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData[
                          PIM_FIELD_GROUP_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_add_group_name'),
                      handleChange: (event) => {
                        this.contactGroupDetailViewModel.handleFormPropsData(
                          PIM_FIELD_GROUP_DETAIL_FIELD_KEY.NAME,
                          event.target.value
                        );
                        if (
                          !this.contactGroupDetailViewModel.contactGroupDetailViewModel
                            .formPropsData[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS]
                        ) {
                          this.debouncedChangeHandler(event.target.value);
                        }
                      },
                      required: true,
                      validation: 'required',
                      blurred: () => {
                        this.validator.showMessageFor('Field Group Name');
                      },
                    }}
                  />
                  {this.validator.message(
                    'Field Group Name',
                    this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData[
                      PIM_FIELD_GROUP_DETAIL_FIELD_KEY.NAME
                    ],
                    'required',
                    {
                      className: 'text-danger mt-8px',
                    }
                  )}
                </Form.Group>

                <ContactGroupInformation
                  validator={this.validator}
                  formPropsData={
                    this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData
                  }
                />
              </Col>
              <Col lg={3}>
                <PublishOptions
                  detailViewModal={this.contactGroupDetailViewModel}
                  formPropsData={
                    this.contactGroupDetailViewModel.contactGroupDetailViewModel.formPropsData
                  }
                  isEdit={this.isEdit}
                  isPublished={false}
                  isFeatured={false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withContactGroupViewModel(EditContactGroup)));
