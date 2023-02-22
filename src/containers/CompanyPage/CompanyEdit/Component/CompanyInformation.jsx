import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withCompanyViewModel } from 'containers/CompanyPage/CompanyViewModel/CompanyViewModelContextProvider';
import ComponentSVG from 'components/ComponentSVG';
import { CRM_COMPANY_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import { Row } from 'react-bootstrap';

const CompanyInformation = observer(
  class CompanyInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.companyDetailViewModel;
      this.contactListViewModel = this.props.contactListViewModel;
    }

    render() {
      const { t, validator, isEdit } = this.props;
      let dataTable = this.contactListViewModel.items ?? [];
      const handleSelectContact = (data, isAll = false) => {
        if (isAll) {
          this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
            'CONTACTS',
            this.contactListViewModel.items
          );
          dataTable.map((item) => {
            return Object.assign(item, { selected: true });
          });
        } else {
          let dataAppend = Object.assign(data.original, { selected: true });
          this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
            'CONTACTS',
            this.viewModel.companyDetailViewModel.formPropsData['CONTACTS']?.length
              ? [...this.viewModel.companyDetailViewModel.formPropsData['CONTACTS'], dataAppend]
              : [dataAppend]
          );
          let indexSelected = dataTable.findIndex((obj) => {
            return obj.id === data.original.id;
          });
          Object.assign(dataTable[indexSelected], { selected: true });
        }
        this.forceUpdate();
      };

      const handleUnSelectContact = async (data, isAll = false) => {
        if (isAll) {
          this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
            'CONTACTS',
            []
          );
          dataTable.map((item) => {
            return Object.assign(item, { selected: false });
          });
        } else {
          let dataOnSelected = this.viewModel.companyDetailViewModel.formPropsData['CONTACTS'];
          if (dataOnSelected.length > 1) {
            let dataFiltered = dataOnSelected.filter(function (item) {
              return item.id !== data.original.id;
            });
            this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
              'CONTACTS',
              dataFiltered
            );
          } else {
            this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
              'CONTACTS',
              []
            );
          }
          Object.assign(
            dataTable[
              dataTable.findIndex((obj) => {
                return obj.id === data.original.id;
              })
            ],
            { selected: false }
          );
        }

        this.forceUpdate();
      };
      const columnsTable = [
        {
          Header: 'ID',
          accessor: 'id',
          width: 80,
          className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
          Cell: ({ value }) => {
            return <div className="d-flex align-items-center py-16">{value}</div>;
          },
        },
        {
          Header: t('txt_email'),
          accessor: 'title',
          width: 150,
          className: 'py-18 text-gray text-uppercase fw-semi align-middle',
          Cell: ({ value }) => {
            return <div className="d-flex align-items-center py-16">{value}</div>;
          },
        },
        {
          Header: '',
          accessor: 'plus',
          width: 150,
          className: 'py-18 text-gray text-uppercase fw-semi align-middle',
          Cell: ({ row }) => {
            return (
              <>
                <div
                  className="d-flex align-items-center justify-content-end cursor-pointer py-16"
                  onClick={() => {
                    handleSelectContact(row);
                  }}
                >
                  <ComponentSVG
                    url="/assets/images/plus.svg"
                    className={`me-1`}
                    width={'13px'}
                    height={'13px'}
                  />
                </div>
              </>
            );
          },
        },
      ];
      const columnsTableSelected = [
        {
          Header: '',
          accessor: 'minus',
          width: 50,
          className: 'py-18 text-gray text-uppercase fw-semi align-middle',
          Cell: ({ row }) => {
            return (
              <>
                <div
                  className="d-flex align-items-center justify-content-center cursor-pointer py-16"
                  onClick={() => {
                    handleUnSelectContact(row);
                  }}
                >
                  <ComponentSVG
                    url="/assets/images/minus.png"
                    className={`me-1`}
                    width={'13px'}
                    height={'13px'}
                  />
                </div>
              </>
            );
          },
        },
        {
          Header: 'ID',
          accessor: 'id',
          width: 80,
          className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
          Cell: ({ value }) => {
            return <div className="d-flex align-items-center py-16">{value}</div>;
          },
        },
        {
          Header: t('txt_email'),
          accessor: 'title',
          width: 150,
          className: 'py-18 text-gray text-uppercase fw-semi align-middle',
          Cell: ({ value }) => {
            return <div className="d-flex align-items-center py-16">{value}</div>;
          },
        },
      ];
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_company_name'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NAME,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NAME
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NAME,
                  data.target.value
                );
              },
              required: true,
              validation: 'required',
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_address'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ADDRESS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ADDRESS
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ADDRESS,
                  data.target.value
                );
              },
              required: true,
              validation: 'required',
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_website'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_WEBSITE,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_WEBSITE
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_WEBSITE,
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: t('txt_company_annual_revenue'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ANNUAL_REVENUE,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ANNUAL_REVENUE
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_ANNUAL_REVENUE,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_company_number_employees'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NUMBER_EMPLOYEES,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NUMBER_EMPLOYEES
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_NUMBER_EMPLOYEES,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_company_contact_email'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_CONTACT_EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_CONTACT_EMAIL
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_CONTACT_EMAIL,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_company_tax_number'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_TAX_NUMBER,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_TAX_NUMBER
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_TAX_NUMBER,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_company_fax_number'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_FAX_NUMBER,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_FAX_NUMBER
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_FAX_NUMBER,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            {
              label: t('txt_company_phone_number'),
              key: CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_PHONE_NUMBER,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.companyDetailViewModel.formPropsData[
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_PHONE_NUMBER
                ],
              handleChange: (data) => {
                this.viewModel.companyDetailViewModel.companyDetailViewModel.handleFormPropsData(
                  CRM_COMPANY_DETAIL_FIELD_KEY.COMPANY_PHONE_NUMBER,
                  data.target.value
                );
              },
              className: 'col-lg-6',
            },
            ...(isEdit
              ? [
                  {
                    label: t('txt_add_contact_to_company'),
                    key: 'CONTACTS',
                    type: FORM_FIELD_TYPE.SELECTION_COLUMN,
                    columnsTable: columnsTable,
                    dataTable: dataTable,
                    onSelectAll: () => {
                      handleSelectContact(null, true);
                    },
                    columnsTableSelected: columnsTableSelected,
                    dataTableSelected: this.viewModel.companyDetailViewModel.formPropsData[
                      'CONTACTS'
                    ]?.length
                      ? this.viewModel.companyDetailViewModel.formPropsData['CONTACTS']
                      : [],
                    onUnSelectAll: () => {
                      handleUnSelectContact(null, true);
                    },
                    className: 'col-lg-12',
                  },
                ]
              : []),
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.props.viewModel.companyDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
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
export default withTranslation('common')(withCompanyViewModel(CompanyInformation));
