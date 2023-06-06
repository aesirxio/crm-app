/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import customStyles from './customStyles';
import { ThemesContext } from 'aesirx-uikit';
import { withTranslation } from 'react-i18next';
import { SVGComponent as ComponentSVG } from 'aesirx-uikit';

class CreatableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? [],
      inputValue: '',
    };
  }

  createOption = (label) => ({
    label,
    value: label,
  });
  handleKeyDown = async (event) => {
    if (!this.state.inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        await this.setState((prevState) => {
          return {
            ...prevState,
            inputValue: '',
            value: [...prevState.value, this.createOption(this.state.inputValue)],
          };
        });
        this.props.onChange(this.state.value);

        event.preventDefault();
    }
  };

  componentDidMount() {}
  render() {
    const { t } = this.props;
    const { theme } = this.context;
    let { isBorder, plColor, placeholder, arrowColor, onChange } = this.props;
    let creatable = true;
    if (theme == 'dark') {
      plColor = '#bfc9f7';
    }
    let styles = customStyles(isBorder, plColor, arrowColor, creatable);

    const MultiValueRemove = (props) => {
      return (
        <components.MultiValueRemove {...props}>
          {' '}
          <ComponentSVG url="/assets/images/cancel.svg" color="#C0C0C0" />
        </components.MultiValueRemove>
      );
    };

    return (
      <CreatableSelect
        {...this.props}
        components={{
          ClearIndicator: null,
          MultiValueRemove,
        }}
        styles={styles}
        inputValue={this.state.inputValue}
        isClearable
        isMulti
        placeholder={placeholder ?? t('txt_type_something_and_press_enter')}
        onChange={(newValue) => {
          onChange(newValue);
          return this.setState((prevState) => {
            return {
              ...prevState,
              value: newValue,
            };
          });
        }}
        onInputChange={(newValue) =>
          this.setState((prevState) => {
            return {
              ...prevState,
              inputValue: newValue,
            };
          })
        }
        onKeyDown={this.handleKeyDown}
        value={this.state.value}
      />
    );
  }
}

CreatableComponent.contextType = ThemesContext;
export default withTranslation()(CreatableComponent);
