/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import CreatableComponent from '../../../components/Select/Creatable';
import './index.scss';

class FormSelectionCustom extends Component {
  constructor(props) {
    super(props);
    this.state = { field: props.field.getValueSelected };
  }

  handleChange = (data) => {
    this.props.field.handleChange(data);
    this.setState({ field: data });
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.field.getValueSelected !== this.props.field.getValueSelected) {
      this.setState({ field: this.props.field.getValueSelected });
    }
  };
  render() {
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div className="w-100">
          {this.props.field.creatable ? (
            <CreatableComponent
              value={this.state.field ?? null}
              isBorder={true}
              options={this.props.field?.getDataSelectOptions}
              arrowColor={this.props.field.arrowColor}
              placeholder={this.props.field.placeholder}
              className="fs-14"
              onChange={this.props.field.handleChange}
            />
          ) : (
            <>
              <SelectComponent
                value={this.state.field ?? null}
                options={this.props.field?.getDataSelectOptions}
                className="fs-14"
                isBorder={true}
                //onFocus={this.props.field.changed}
                onBlur={this.props.field?.blurred}
                isMulti={this.props.field?.isMulti}
                onChange={this.handleChange}
                arrowColor={this.props.field?.arrowColor}
                placeholder={this.props.field?.placeholder}
                isDisabled={this.props.field?.isDisabled}
              />
            </>
          )}
        </div>

        {this.props.field?.component ? this.props.field?.component : null}
      </div>
    );
  }
}

export default FormSelectionCustom;
