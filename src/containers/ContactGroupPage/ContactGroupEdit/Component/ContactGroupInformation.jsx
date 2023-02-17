import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { observer } from 'mobx-react';
import { withContactGroupViewModel } from 'containers/ContactGroupPage/ContactGroupViewModel/ContactGroupViewModelContextProvider';

const ContactGroupInformation = observer(
  class ContactGroupInformation extends Component {
    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel.contactGroupDetailViewModel;
      this.contactListViewModel = this.props.contactListViewModel;
    }

    render() {
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_group_name'),
              key: 'GROUP_NAME',
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.viewModel.contactGroupDetailViewModel.formPropsData['GROUP_NAME'],
              placeholder: t('txt_type'),
              handleChange: (data) => {
                this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
                  'GROUP_NAME',
                  data.target.value
                );
              },
              required: true,
              className: 'col-lg-12',
            },
            {
              label: t('txt_add_contact_to_group'),
              key: 'CONTACTS',
              type: FORM_FIELD_TYPE.SELECTION_COLUMN,
              getValueSelected: this.viewModel.contactGroupDetailViewModel.formPropsData['CONTACTS']
                ?.length
                ? this.viewModel.contactGroupDetailViewModel.formPropsData['CONTACTS'].map(
                    (item) => {
                      return {
                        label: item.label,
                        value: item.value,
                      };
                    }
                  )
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
              handleChange: (data) => {
                this.viewModel.contactGroupDetailViewModel.contactGroupDetailViewModel.handleFormPropsData(
                  'CONTACTS',
                  data
                );
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
