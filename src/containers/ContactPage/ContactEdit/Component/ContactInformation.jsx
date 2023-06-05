import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { observer } from 'mobx-react';
import { withContactViewModel } from 'containers/ContactPage/ContactViewModel/ContactViewModelContextProvider';
import {
  CRM_COMPANY_DETAIL_FIELD_KEY,
  CRM_CONTACT_DETAIL_FIELD_KEY,
  CRM_LIST_GROUP_DETAIL_FIELD_KEY,
  CRM_STATUS_DETAIL_FIELD_KEY,
} from 'aesirx-lib';

const ContactInformation = observer(
  class ContactInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.contactDetailViewModel;
      this.companyListViewModel = this.props.companyListViewModel;
      this.contactGroupListViewModel = this.props.contactGroupListViewModel;
    }

    async componentDidMount() {}

    render() {
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_contact_name'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.NAME,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData[
                  CRM_CONTACT_DETAIL_FIELD_KEY.NAME
                ],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              validation: 'required',
              blurred: () => {
                if (
                  !validator?.fields[t('txt_contact_name')] ||
                  !this.viewModel.contactDetailViewModel.formPropsData[
                    CRM_CONTACT_DETAIL_FIELD_KEY.NAME
                  ]
                ) {
                  validator.showMessageFor(t('txt_contact_name'));
                  this.forceUpdate();
                }
              },
              handleChange: (event) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.NAME,
                  event.target.value
                );
              },
            },
            {
              label: t('txt_company_name'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
                CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_ID
              ]
                ? {
                    label:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_NAME
                      ],
                    value:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_ID
                      ],
                  }
                : null,
              getDataSelectOptions: this.companyListViewModel.items
                ? this.companyListViewModel.items.map((item) => {
                    return {
                      label: item[CRM_COMPANY_DETAIL_FIELD_KEY.NAME],
                      value: item.id,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_ID,
                  data.value
                );
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.COMPANY_NAME,
                  data.label
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_email'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData[
                  CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS
                ],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              validation: 'required',
              handleChange: (event) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS,
                  event.target.value
                );
              },
              blurred: () => {
                if (
                  !validator?.fields[t('txt_email')] ||
                  !this.viewModel.contactDetailViewModel.formPropsData[
                    CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS
                  ]
                ) {
                  validator.showMessageFor(t('txt_email'));
                  this.forceUpdate();
                }
              },
            },
            {
              label: t('txt_phone'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.PHONE_NUMBER,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData[
                  CRM_CONTACT_DETAIL_FIELD_KEY.PHONE_NUMBER
                ],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              validation: 'required',
              handleChange: (event) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.PHONE_NUMBER,
                  event.target.value
                );
              },
              blurred: () => {
                if (
                  !validator?.fields[t('txt_phone')] ||
                  !this.viewModel.contactDetailViewModel.formPropsData[
                    CRM_CONTACT_DETAIL_FIELD_KEY.PHONE_NUMBER
                  ]
                ) {
                  validator.showMessageFor(t('txt_phone'));
                  this.forceUpdate();
                }
              },
            },
            {
              label: t('txt_contact_groups'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.LISTGROUPS,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
                CRM_CONTACT_DETAIL_FIELD_KEY.LISTGROUPS
              ]?.length
                ? this.viewModel.contactDetailViewModel.formPropsData[
                    CRM_CONTACT_DETAIL_FIELD_KEY.LISTGROUPS
                  ].map((item) => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })
                : null,
              getDataSelectOptions: this.contactGroupListViewModel.items
                ? this.contactGroupListViewModel.items.map((item) => {
                    return {
                      label: item[CRM_LIST_GROUP_DETAIL_FIELD_KEY.NAME],
                      value: item[CRM_LIST_GROUP_DETAIL_FIELD_KEY.ID],
                    };
                  })
                : null,
              isMulti: true,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.LISTGROUPS,
                  data.map((item) => {
                    return {
                      id: item.value,
                      name: item.label,
                    };
                  })
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_status'),
              key: CRM_CONTACT_DETAIL_FIELD_KEY.CONTACT_STATUS,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
                CRM_CONTACT_DETAIL_FIELD_KEY.CONTACT_STATUS
              ]
                ? {
                    label:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        CRM_CONTACT_DETAIL_FIELD_KEY.CONTACT_STATUS
                      ]?.name,
                    value:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        CRM_CONTACT_DETAIL_FIELD_KEY.CONTACT_STATUS
                      ]?.id,
                  }
                : null,
              getDataSelectOptions: this.viewModel.contactDetailViewModel.contactDetailViewModel
                ?.statusListItems?.length
                ? this.viewModel.contactDetailViewModel.contactDetailViewModel?.statusListItems.map(
                    (item) => {
                      return {
                        label: item[CRM_STATUS_DETAIL_FIELD_KEY.TITLE],
                        value: item[CRM_STATUS_DETAIL_FIELD_KEY.ID],
                      };
                    }
                  )
                : null,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.CONTACT_STATUS,
                  {
                    name: data.label,
                    id: data.value,
                  }
                );
              },
              className: 'col-lg-12',
            },

            // {
            //   label: t('txt_track_this_user'),
            //   key: 'TRACK_THIS_USER',
            //   type: FORM_FIELD_TYPE.RADIO,
            //   getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
            //     'TRACK_THIS_USER'
            //   ]
            //     ? {
            //         label:
            //           this.viewModel.contactDetailViewModel.formPropsData[
            //             'TRACK_THIS_USER'
            //           ].toString() === '1'
            //             ? t('txt_yes')
            //             : t('txt_no'),
            //         value:
            //           this.viewModel.contactDetailViewModel.formPropsData[
            //             'TRACK_THIS_USER'
            //           ].toString(),
            //       }
            //     : { label: t('txt_yes'), value: '1' },
            //   getDataSelectOptions: [
            //     { label: t('txt_yes'), value: '1' },
            //     { label: t('txt_no'), value: '0' },
            //   ],
            //   handleChange: (data) => {
            //     this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
            //       'TRACK_THIS_USER',
            //       data.target.value
            //     );
            //   },
            //   className: 'col-lg-12',
            // },
            {
              key: CRM_CONTACT_DETAIL_FIELD_KEY.DESCRIPTION,
              label: t('txt_note'),
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData[
                  CRM_CONTACT_DETAIL_FIELD_KEY.DESCRIPTION
                ] ?? null,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  CRM_CONTACT_DETAIL_FIELD_KEY.DESCRIPTION,
                  data
                );
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="position-relative">
          <div className="p-24 pb-8px bg-white rounded-1 shadow-sm h-100 mt-24">
            {Object.keys(generateFormSetting)
              .map((groupIndex) => {
                return [...Array(generateFormSetting[groupIndex])].map((group) => {
                  return renderingGroupFieldHandler(group, validator);
                });
              })
              .reduce((arr, el) => {
                return arr.concat(el);
              }, [])}
          </div>
        </div>
      );
    }
  }
);
export default withTranslation('common')(withContactViewModel(ContactInformation));
