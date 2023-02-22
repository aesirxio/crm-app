import { FORMAT_DATE_UPDATE_POST, FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withOpportunityViewModel } from 'containers/OpportunityPage/OpportunityViewModel/OpportunityViewModelContextProvider';
import { Row } from 'react-bootstrap';
import moment from 'moment';

const OpportunityInformation = observer(
  class OpportunityInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.opportunityDetailViewModel;
      this.contactListViewModel = this.props.contactListViewModel;
    }

    render() {
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_opportunity_name'),
              key: 'OPPORTUNITY_NAME',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['OPPORTUNITY_NAME'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'OPPORTUNITY_NAME',
                  data.target.value
                );
              },
              required: true,
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_name'),
              key: 'COMPANY_NAME',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['COMPANY_NAME'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'COMPANY_NAME',
                  data.target.value
                );
              },
              required: true,
              className: 'col-lg-12',
            },
            {
              label: t('txt_contact'),
              key: 'CONTACT',
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.opportunityDetailViewModel.formPropsData['CONTACT']
                ?.length
                ? this.viewModel.opportunityDetailViewModel.formPropsData['CONTACT'].map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              getDataSelectOptions: this.contactListViewModel.items
                ? this.contactListViewModel.items.map((item) => {
                    return {
                      label: item.title,
                      value: item.id,
                    };
                  })
                : null,
              isMulti: true,
              required: true,
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'CONTACT',
                  data
                );
              },
              placeholder: t('txt_type_to_search'),
              className: 'col-lg-12',
            },
            {
              label: t('txt_lead_source'),
              key: 'LEAD_SOURCE',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['LEAD_SOURCE'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'LEAD_SOURCE',
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_budget_amount'),
              key: 'BUDGET_AMOUNT',
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['BUDGET_AMOUNT'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'BUDGET_AMOUNT',
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_estimated_value'),
              key: 'ESTIMATED_VALUE',
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['ESTIMATED_VALUE'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'ESTIMATED_VALUE',
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_expect_closed_date'),
              key: 'EXPECT_CLOSED_DATE',
              type: FORM_FIELD_TYPE.DATE,
              icon: '/assets/images/calendar-line.png',
              iconClass: 'bg-success',
              placeholder: 'Choose date',
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['EXPECT_CLOSED_DATE'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'EXPECT_CLOSED_DATE',
                  data && moment(data).format(FORMAT_DATE_UPDATE_POST)
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_assign_to'),
              key: 'ASSIGN_TO',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['ASSIGN_TO'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'ASSIGN_TO',
                  data.target.value
                );
              },
              required: true,
              className: 'col-lg-6',
            },
            {
              label: t('txt_close_probability'),
              key: 'CLOSE_PROBABILITY',
              type: FORM_FIELD_TYPE.NUMBER,
              format: '%',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['CLOSE_PROBABILITY'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'CLOSE_PROBABILITY',
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_next_step'),
              key: 'NEXT_STEP',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['NEXT_STEP'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'NEXT_STEP',
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_description'),
              key: 'DESCRIPTION',
              type: FORM_FIELD_TYPE.TEXTAREA,
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData['DESCRIPTION'],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  'DESCRIPTION',
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.props.viewModel.opportunityDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <Row>
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
      );
    }
  }
);
export default withTranslation('common')(withOpportunityViewModel(OpportunityInformation));
