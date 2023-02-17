/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

import './index.scss';

class FormSelectionColumn extends Component {
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
    const { t } = this.props;
    return (
      <>
        <Row className="gx-lg-8 gx-4">
          <Col lg="6">
            <div className="p-24 bg-white border rounded-2">
              <div className="d-flex align-items-center justify-content-between fs-14">
                <div className="fw-semibold">{t('txt_all_contacts')}</div>
                <div className="text-success cursor-pointer d-flex align-items-center">
                  <ComponentSVG
                    url="/assets/images/plus.svg"
                    className={`me-1 bg-success`}
                    width={'13px'}
                    height={'13px'}
                  />
                  {t('txt_select_all')}
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="p-24 bg-white border rounded-2">
              <div className="d-flex align-items-center justify-content-between fs-14">
                <div className="fw-semibold">{t('txt_selected_contacts')}</div>
                <div className="text-danger cursor-pointer d-flex align-items-center">
                  <ComponentSVG
                    url="/assets/images/minus.png"
                    className={`me-1 bg-danger`}
                    width={'13px'}
                    height={'13px'}
                  />
                  {t('txt_unselect_all')}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <SelectComponent
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
        /> */}
      </>
    );
  }
}

export default withTranslation('common')(FormSelectionColumn);
