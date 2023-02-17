import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import { withEmailViewModel } from 'containers/EmailPage/EmailViewModel/EmailViewModelContextProvider';
import { capitalizeFirstLetter } from 'containers/EmailPage/utils';

class FromEmail extends Component {
  constructor(props) {
    super(props);
    this.viewModel = this.props.viewModel.emailDetailViewModel;
    this.companyListViewModel = this.props.companyListViewModel;
    this.state = {
      fromSelect: 'from',
    };
  }

  async componentDidMount() {}

  render() {
    const { t, validator } = this.props;

    console.log('dsajdksajkdjksa', this.viewModel.emailDetailViewModel.formPropsData['EMAIL_FROM']);
    const generateFormSetting = [
      {
        fields: [
          {
            key: 'FROM_LABEL',
            type: FORM_FIELD_TYPE.SELECTION,
            getValueSelected: this.viewModel.emailDetailViewModel.formPropsData['FROM_LABEL']
              ? {
                  label: this.viewModel.emailDetailViewModel.formPropsData['FROM_LABEL'],
                  value: this.viewModel.emailDetailViewModel.formPropsData['FROM_LABEL_VALUE'],
                }
              : {
                  label: capitalizeFirstLetter(t('txt_from')),
                  value: this.state.fromSelect,
                },
            getDataSelectOptions: [
              {
                label: capitalizeFirstLetter(t('txt_from')),
                value: 'from',
              },
              {
                label: capitalizeFirstLetter(t('txt_other')),
                value: 'other',
              },
            ],
            handleChange: (data) => {
              this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                'FROM_LABEL',
                data.label
              );
              this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                'FROM_LABEL_VALUE',
                data.value
              );
              if (data.value === 'from') {
                this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                  'EMAIL_FROM',
                  Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME)
                );
              }
              this.setState({ fromSelect: data.value });
            },
            className: 'col-lg-2',
            classNameInput: 'text-capitalize',
          },
          {
            key: 'EMAIL_FROM',
            type: FORM_FIELD_TYPE.INPUT,
            getValueSelected:
              this.viewModel.emailDetailViewModel.formPropsData['EMAIL_FROM'] ??
              Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME),
            className: 'col-lg-10',
            placeholder: t('txt_type'),
            handleChange: (event) => {
              this.viewModel.emailDetailViewModel.emailDetailViewModel.handleFormPropsData(
                'EMAIL_FROM',
                event.target.value
              );
            },
            disabled: this.state.fromSelect === 'other' ? false : true,
          },
        ],
      },
    ];

    return Object.keys(generateFormSetting)
      .map((groupIndex) => {
        return [...Array(generateFormSetting[groupIndex])].map((group) => {
          return renderingGroupFieldHandler(group, validator);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  }
}
export default withTranslation('common')(withEmailViewModel(FromEmail));