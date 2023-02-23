import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { observer } from 'mobx-react';
import { withContactGroupViewModel } from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModelContextProvider';
import ComponentSVG from 'components/ComponentSVG';
import { CRM_CONTACT_DETAIL_FIELD_KEY, CRM_LIST_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';

const ContactGroupInformation = observer(
  class ContactGroupInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.contactGroupDetailViewModel;
      this.contactListViewModel = this.props.contactListViewModel;
    }
    render() {
      const { t, validator } = this.props;
      let dataTable = this.contactListViewModel.items ?? [];
      if (
        this.viewModel.contactGroupDetailViewModel.formPropsData[
          CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
        ]?.length &&
        dataTable.length
      ) {
        this.viewModel.contactGroupDetailViewModel.formPropsData[
          CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
        ].map((item) => {
          let index = dataTable.findIndex((obj) => {
            return obj.id === item.id;
          });
          dataTable[index].selected = true;
          return;
        });
      }
      const handleSelectContact = (data, isAll = false) => {
        if (isAll) {
          this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
            CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
            this.contactListViewModel.items
          );
          dataTable.map((item) => {
            return Object.assign(item, { selected: true });
          });
        } else {
          let dataAppend = Object.assign(data.original, { selected: true });
          this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
            CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
            this.viewModel.contactGroupDetailViewModel.formPropsData[
              CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
            ]?.length
              ? [
                  ...this.viewModel.contactGroupDetailViewModel.formPropsData[
                    CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
                  ],
                  dataAppend,
                ]
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
          this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
            CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
            []
          );
          dataTable.map((item) => {
            return Object.assign(item, { selected: false });
          });
        } else {
          let dataOnSelected =
            this.viewModel.contactGroupDetailViewModel.formPropsData[
              CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
            ];
          if (dataOnSelected.length > 1) {
            let dataFiltered = dataOnSelected.filter(function (item) {
              return item.id !== data.original.id;
            });
            this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
              CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
              dataFiltered
            );
          } else {
            this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
              CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
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
          accessor: CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS,
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
          accessor: CRM_CONTACT_DETAIL_FIELD_KEY.EMAIL_ADDRESS,
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
              label: t('txt_group_name'),
              key: CRM_LIST_GROUP_DETAIL_FIELD_KEY.NAME,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactGroupDetailViewModel.formPropsData[
                  CRM_LIST_GROUP_DETAIL_FIELD_KEY.NAME
                ],
              placeholder: t('txt_type'),
              handleChange: (data) => {
                this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
                  CRM_LIST_GROUP_DETAIL_FIELD_KEY.NAME,
                  data.target.value
                );
              },
              required: true,
              validation: 'required',
              className: 'col-lg-12',
            },
            {
              label: t('txt_add_contact_to_group'),
              key: CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS,
              type: FORM_FIELD_TYPE.SELECTION_COLUMN,
              columnsTable: columnsTable,
              dataTable: dataTable,
              onSelectAll: () => {
                handleSelectContact(null, true);
              },
              columnsTableSelected: columnsTableSelected,
              dataTableSelected: this.viewModel.contactGroupDetailViewModel.formPropsData[
                CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
              ]?.length
                ? this.viewModel.contactGroupDetailViewModel.formPropsData[
                    CRM_LIST_GROUP_DETAIL_FIELD_KEY.CONTACTS
                  ]
                : [],
              onUnSelectAll: () => {
                handleUnSelectContact(null, true);
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
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
      );
    }
  }
);
export default withTranslation('common')(withContactGroupViewModel(ContactGroupInformation));
