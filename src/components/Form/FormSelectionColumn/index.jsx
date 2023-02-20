/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import './index.scss';
import SelectionTable from './SelectionTable';

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
                <div
                  className="text-success cursor-pointer d-flex align-items-center"
                  onClick={this.props.field.onSelectAll}
                >
                  <ComponentSVG
                    url="/assets/images/plus.svg"
                    className={`me-1 bg-success`}
                    width={'13px'}
                    height={'13px'}
                  />
                  {t('txt_select_all')}
                </div>
              </div>
              <SelectionTable
                classNameTable={`bg-white rounded table-striped table`}
                columns={this.props.field.columnsTable}
                data={this.props.field.dataTable}
              ></SelectionTable>
            </div>
          </Col>
          <Col lg="6">
            <div className="p-24 bg-white border rounded-2">
              <div className="d-flex align-items-center justify-content-between fs-14">
                <div className="fw-semibold">{t('txt_selected_contacts')}</div>
                <div
                  className="text-danger cursor-pointer d-flex align-items-center"
                  onClick={this.props.field.onUnSelectAll}
                >
                  <ComponentSVG
                    url="/assets/images/minus.png"
                    className={`me-1 bg-danger`}
                    width={'13px'}
                    height={'13px'}
                  />
                  {t('txt_unselect_all')}
                </div>
              </div>
              <SelectionTable
                classNameTable={`bg-white rounded table-striped table`}
                columns={this.props.field.columnsTableSelected}
                data={this.props.field.dataTableSelected}
                isSelectedTable={true}
              ></SelectionTable>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default withTranslation('common')(FormSelectionColumn);
