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
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import '../index.scss';
import ActionsBar from 'components/ActionsBar';
import CommonInformation from './Component/CommonInformation';
import { withEmailViewModel } from 'containers/EmailPage/EmailViewModel/EmailViewModelContextProvider';
import PublishOptions from 'components/PublishOptions';
import {
  AUTHORIZATION_KEY,
  CRM_CONTACT_DETAIL_FIELD_KEY,
  CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY,
  Storage,
} from 'aesirx-lib';
import Input from 'components/Form/Input';
import SimpleReactValidator from 'simple-react-validator';
import ContactStore from 'containers/ContactPage/ContactStore/ContactStore';
import ContactViewModel from 'containers/ContactPage/ContactViewModel/ContactViewModel';
import EditHeader from 'components/EditHeader';
import { SVGComponent as ComponentSVG } from 'aesirx-uikit';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { renderingGroupFieldHandler } from 'utils/form';
import { historyPush } from 'routes/routes';

const contactStore = new ContactStore();
const contactViewModel = new ContactViewModel(contactStore);
const EditEmail = observer(
  class EditEmail extends Component {
    emailDetailViewModel = null;
    formPropsData = {};
    isEdit = false;
    constructor(props) {
      super(props);
      this.state = { key: 'commonInformation', requiredField: '', showPreview: false };
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.emailDetailViewModel = this.viewModel ? this.viewModel.getEmailDetailViewModel() : null;
      this.contactListViewModel = contactViewModel
        ? contactViewModel.getContactListViewModel()
        : null;
      this.emailDetailViewModel.setForm(this);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.isEdit = props.match.params?.id ? true : false;
    }
    handleShowPreview = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          showPreview: true,
        };
      });
    };

    handleClosePreview = async () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          showPreview: false,
        };
      });
      await this.emailDetailViewModel.sendTest();
    };

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.emailDetailViewModel.initializeData();
      } else {
        this.emailDetailViewModel.handleFormPropsData(
          CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.SENDER,
          Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL)
        );
      }
      await this.contactListViewModel.handleFilter({ limit: 0, 'filter[state]': 1 });
      await this.contactListViewModel.initializeData();
    }

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
      const { t } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              key: CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST
              ]?.length
                ? this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                    CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST
                  ].map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              getDataSelectOptions: this.contactListViewModel.items
                ? this.contactListViewModel.items.map((item) => {
                    return {
                      label: item[CRM_CONTACT_DETAIL_FIELD_KEY.NAME],
                      value: item[CRM_CONTACT_DETAIL_FIELD_KEY.ID],
                      email: item[CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS],
                    };
                  })
                : null,
              isMulti: true,
              creatable: true,
              handleChange: (data) => {
                this.emailDetailViewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST,
                  data
                );
              },
              placeholder: t('txt_select_or_type_email_to_send_test'),
              className: 'col-lg-12 mb-16px',
            },
          ],
        },
      ];

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
                      historyPush(`/email/all`);
                    },
                    icon: '/assets/images/cancel.svg',
                  },
                  {
                    title: t('txt_preview'),
                    handle: () => {
                      this.handleShowPreview();
                    },
                    icon: '/assets/images/preview.svg',
                  },
                  {
                    title: t('txt_send_a_test'),
                    handle: async () => {
                      if (this.validator.allValid()) {
                        this.emailDetailViewModel.handleFormPropsData(
                          CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS_TEST,
                          [
                            {
                              label: Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL),
                              value: Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL),
                              email: Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL),
                            },
                          ]
                        );
                        await this.emailDetailViewModel.sendTest();
                      } else {
                        this.handleValidateForm();
                      }
                    },
                  },
                  {
                    title: t('txt_send_email'),
                    validator: this.validator,
                    handle: async () => {
                      if (this.validator.allValid()) {
                        if (this.isEdit) {
                          await this.emailDetailViewModel.update();
                          await this.emailDetailViewModel.initializeData();
                          this.forceUpdate();
                        } else {
                          let result = await this.emailDetailViewModel.create();
                          result && historyPush(`/email`);
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
              <Col xxl={9} lg={8} className="h-100">
                <Form.Group className={`mb-24`}>
                  <Input
                    field={{
                      getValueSelected:
                        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                          CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.NAME
                        ],
                      classNameInput: 'py-1 fs-4',
                      placeholder: t('txt_mail_name'),
                      handleChange: (event) => {
                        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                          CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.NAME
                        ] = event.target.value;
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
                      CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.NAME
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
                  contactListViewModel={this.contactListViewModel}
                  requiredField={this.state.requiredField}
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
          <Modal show={this.state.showPreview} onHide={this.handleClosePreview} centered size="xl">
            <Modal.Body className="p-24">
              <div className="border-bottom d-flex align-items-center justify-content-between pb-24 mb-24">
                <h3 className="fw-bold mb-0">{t('txt_preview')}</h3>
                <div className="cursor-pointer" onClick={this.handleClosePreview}>
                  <ComponentSVG
                    url="/assets/images/close-circle.svg"
                    className={'bg-success'}
                    width="24px"
                    height="24px"
                  />
                </div>
              </div>
              <Row>
                <Col lg="8">
                  <div className="bg-gray-100 p-24 rounded-2 border border-gray-500 rounded-bottom-end-0 rounded-bottom-start-0 border-bottom-0">
                    <Table className="mb-0">
                      <tbody>
                        <tr>
                          <td className="border-bottom-0 py-4px fw-semibold text-capitalize">
                            {t('txt_from')}:
                          </td>
                          <td className="border-bottom-0 py-4px">
                            {this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                              'EMAIL_FROM'
                            ] ?? Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-bottom-0 py-4px fw-semibold text-capitalize">
                            {t('txt_to')}:
                          </td>
                          <td className="border-bottom-0 py-4px">
                            {this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                              CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS
                            ]?.length
                              ? this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                                  CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.RECEIVERS
                                ].map((item, key) => {
                                  return (key > 0 ? '; ' : '') + item.label;
                                })
                              : null}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-bottom-0 py-4px fw-semibold text-capitalize">
                            {t('txt_subject')}:
                          </td>
                          <td className="border-bottom-0 py-4px">
                            {this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                              CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.SUBJECT
                            ] ?? null}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div
                    className="p-24 bg-white rounded-2 border border-gray-500 rounded-top-end-0 rounded-top-start-0"
                    dangerouslySetInnerHTML={{
                      __html:
                        this.emailDetailViewModel.emailDetailViewModel.formPropsData[
                          CRM_EMAIL_MARKETING_DETAIL_FIELD_KEY.CONTENT
                        ] ?? null,
                    }}
                  ></div>
                </Col>
                <Col lg="4">
                  <div className="p-24 bg-white rounded-2 border border-gray-500">
                    <h5 className="fw-semibold mb-16">{t('txt_preview_test')}</h5>
                    <p className="mb-16">{t('txt_preview_email_text')}</p>
                    <Row className="gx-24">
                      {Object.keys(generateFormSetting)
                        .map((groupIndex) => {
                          return [...Array(generateFormSetting[groupIndex])].map((group) => {
                            return renderingGroupFieldHandler(group, this.validator);
                          });
                        })
                        .reduce((arr, el) => {
                          return arr.concat(el);
                        }, [])}
                    </Row>
                    <div className="text-end">
                      <Button
                        variant="success"
                        className="py-16px lh-1 ms-auto"
                        onClick={() => {
                          this.handleClosePreview();
                        }}
                      >
                        {t('txt_send_test')}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
);

export default withTranslation()(withRouter(withEmailViewModel(EditEmail)));
