import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withEmailViewModel } from 'containers/EmailPage/EmailViewModel/EmailViewModelContextProvider';
import { Row } from 'react-bootstrap';
import FromEmail from './FromEmail';

const CommonInformation = observer(
  class CommonInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.emailDetailViewModel;
      this.companyListViewModel = this.props.companyListViewModel;
    }

    async componentDidMount() {}

    render() {
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              key: 'TO_PARTNER_LABEL',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: t('txt_to_partners'),
              readOnly: true,
              className: 'col-lg-2',
            },
            {
              key: 'TO_PARTNERS',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.emailDetailViewModel.formPropsData['TO_PARTNERS']
                ?.length
                ? this.viewModel.emailDetailViewModel.formPropsData['TO_PARTNERS'].map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
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
              creatable: true,
              handleChange: (data) => {
                this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  'TO_PARTNERS',
                  data
                );
              },
              placeholder: t('txt_choose_from_list_contact'),
              className: 'col-lg-10',
            },
            {
              key: 'CC_LABEL',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: t('txt_cc'),
              readOnly: true,
              className: 'col-lg-2',
              classNameInput: 'text-capitalize',
            },
            {
              key: 'CC',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: this.viewModel.emailDetailViewModel.formPropsData['CC'],
              className: 'col-lg-10',
              placeholder: '',
              handleChange: (event) => {
                this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  'CC',
                  event.target.value
                );
              },
            },
            {
              key: 'SUBJECT_LABEL',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: t('txt_subject'),
              readOnly: true,
              className: 'col-lg-2',
              classNameInput: 'text-capitalize',
            },
            {
              key: 'SUBJECT',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected: this.viewModel.emailDetailViewModel.formPropsData['SUBJECT'],
              className: 'col-lg-10',
              placeholder: t('txt_your_title_email'),
              handleChange: (event) => {
                this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  'SUBJECT',
                  event.target.value
                );
              },
            },
          ],
        },
      ];

      const generateFormSetting2 = [
        {
          fields: [
            {
              key: 'MESSAGE',
              label: 'txt_message',
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.viewModel.emailDetailViewModel.formPropsData['MESSAGE'] ?? null,
              handleChange: (data) => {
                this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  'MESSAGE',
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
          {this.companyListViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <div className="p-24 pb-8px bg-white rounded-1 shadow-sm h-100 mt-24">
            <Row className="gx-24">
              <FromEmail validator={validator} companyListViewModel={this.companyListViewModel} />
              {Object.keys(generateFormSetting)
                .map((groupIndex) => {
                  return [...Array(generateFormSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Row>
          </div>
          <div className="p-24 pb-8px bg-white rounded-1 shadow-sm h-100 mt-24">
            <Row className="gx-24">
              {Object.keys(generateFormSetting2)
                .map((groupIndex) => {
                  return [...Array(generateFormSetting2[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Row>
          </div>
        </div>
      );
    }
  }
);
export default withTranslation('common')(withEmailViewModel(CommonInformation));
