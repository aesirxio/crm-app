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
import { CRM_COMPANY_DETAIL_FIELD_KEY, CRM_OPPORTUNITY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
const OpportunityInformation = observer(
  class OpportunityInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.opportunityDetailViewModel;
      this.companyListViewModel = this.props.companyListViewModel;
      this.state = { showPreview: false };
    }
    handleShowPreview = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          showPreview: true,
        };
      });
    };
    handleClosePreview = () => {
      this.setState((prevState) => {
        return {
          ...prevState,
          showPreview: false,
        };
      });
    };

    render() {
      const { t, validator } = this.props;

      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_opportunity_name'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NAME,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NAME
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NAME,
                  data.target.value
                );
              },
              required: true,
              validation: 'required',
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_name'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.COMPANY_ID,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.viewModel.opportunityDetailViewModel.formPropsData[
                CRM_OPPORTUNITY_DETAIL_FIELD_KEY.COMPANY_ID
              ]
                ? {
                    label:
                      this.viewModel.opportunityDetailViewModel.formPropsData[
                        CRM_OPPORTUNITY_DETAIL_FIELD_KEY.crm_company_name
                      ],
                    value:
                      this.viewModel.opportunityDetailViewModel.formPropsData[
                        CRM_OPPORTUNITY_DETAIL_FIELD_KEY.COMPANY_ID
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
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.COMPANY_ID,
                  data.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_lead_source'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.SOURCE,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.SOURCE
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.SOURCE,
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_budget_amount'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.BUDGET_AMOUNT,
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.BUDGET_AMOUNT
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.BUDGET_AMOUNT,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_estimated_value'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ESTIMATED_VALUE,
              type: FORM_FIELD_TYPE.NUMBER,
              format: 'VND',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ESTIMATED_VALUE
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ESTIMATED_VALUE,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_expect_closed_date'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ENDING_DATE,
              type: FORM_FIELD_TYPE.DATE,
              icon: '/assets/images/calendar-line.png',
              iconClass: 'bg-success',
              placeholder: 'Choose date',
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ENDING_DATE
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.ENDING_DATE,
                  data && moment(data).format(FORMAT_DATE_UPDATE_POST)
                );
              },
              className: 'col-lg-6',
            },
            // {
            //   label: t('txt_assign_to'),
            //   key: 'ASSIGN_TO',
            //   type: FORM_FIELD_TYPE.INPUT,
            //   getValueSelected:
            //     this.viewModel.opportunityDetailViewModel.formPropsData['ASSIGN_TO'],
            //   handleChange: (data) => {
            //     this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
            //       'ASSIGN_TO',
            //       data.target.value
            //     );
            //   },
            //   required: true,
            //  validation: 'required',
            //   className: 'col-lg-6',
            // },
            {
              label: t('txt_close_probability'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CLOSE_PROBABILITY,
              type: FORM_FIELD_TYPE.NUMBER,
              format: '%',
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CLOSE_PROBABILITY
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.CLOSE_PROBABILITY,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_next_step'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NEXT_STEP,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NEXT_STEP
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.NEXT_STEP,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_description'),
              key: CRM_OPPORTUNITY_DETAIL_FIELD_KEY.DESCRIPTION,
              type: FORM_FIELD_TYPE.TEXTAREA,
              placeholder: t('txt_text_input_content'),
              getValueSelected:
                this.viewModel.opportunityDetailViewModel.formPropsData[
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.DESCRIPTION
                ],
              handleChange: (data) => {
                this.viewModel.opportunityDetailViewModel.opportunityDetailViewModel.handleFormPropsData(
                  CRM_OPPORTUNITY_DETAIL_FIELD_KEY.DESCRIPTION,
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
