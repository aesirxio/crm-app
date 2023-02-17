import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withContactViewModel } from 'containers/ContactPage/ContactViewModel/ContactViewModelContextProvider';

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
              label: 'txt_contact_name',
              key: 'CONTACT_NAME',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData['CONTACT_NAME'],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              handleChange: (event) => {
                this.viewModel.handleFormPropsData('CONTACT_NAME', event.target.value);
              },
            },
            {
              label: 'txt_email',
              key: 'CONTACT_PHONE',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData['CONTACT_EMAIL'],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              handleChange: (event) => {
                this.viewModel.handleFormPropsData('CONTACT_EMAIL', event.target.value);
              },
            },
            {
              label: 'txt_phone',
              key: 'CONTACT_PHONE',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData['CONTACT_PHONE'],
              className: 'col-lg-12',
              placeholder: t('txt_type'),
              required: true,
              handleChange: (event) => {
                this.viewModel.handleFormPropsData('CONTACT_PHONE', event.target.value);
              },
            },
            {
              label: t('txt_contact_groups'),
              key: 'CONTACT_GROUPS',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
                'CONTACT_GROUPS'
              ]?.length
                ? this.viewModel.contactDetailViewModel.formPropsData['CONTACT_GROUPS'].map(
                    (item) => {
                      return {
                        label: item.label,
                        value: item.value,
                      };
                    }
                  )
                : null,
              getDataSelectOptions: this.contactGroupListViewModel.items
                ? this.contactGroupListViewModel.items.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })
                : null,
              isMulti: true,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  'CONTACT_GROUPS',
                  data
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_name'),
              key: 'COMPANY_NAME',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData['COMPANY_NAME']
                ?.length
                ? this.viewModel.contactDetailViewModel.formPropsData['COMPANY_NAME'].map(
                    (item) => {
                      return {
                        label: item.label,
                        value: item.value,
                      };
                    }
                  )
                : null,
              getDataSelectOptions: this.companyListViewModel.items
                ? this.companyListViewModel.items.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : null,
              isMulti: true,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  'COMPANY_NAME',
                  data
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_track_this_user'),
              key: 'TRACK_THIS_USER',
              type: FORM_FIELD_TYPE.RADIO,
              getValueSelected: this.viewModel.contactDetailViewModel.formPropsData[
                'TRACK_THIS_USER'
              ]
                ? {
                    label:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        'TRACK_THIS_USER'
                      ].toString() === '1'
                        ? t('txt_yes')
                        : t('txt_no'),
                    value:
                      this.viewModel.contactDetailViewModel.formPropsData[
                        'TRACK_THIS_USER'
                      ].toString(),
                  }
                : { label: t('txt_yes'), value: '1' },
              getDataSelectOptions: [
                { label: t('txt_yes'), value: '1' },
                { label: t('txt_no'), value: '0' },
              ],
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  'TRACK_THIS_USER',
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              key: 'CONTACT_NOTE',
              label: 'txt_note',
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.contactDetailViewModel.formPropsData['CONTACT_NOTE'] ?? null,
              handleChange: (data) => {
                this.viewModel.contactDetailViewModel.contactDetailViewModel.handleFormPropsData(
                  'CONTACT_NOTE',
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
          {this.props.viewModel.contactDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
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
