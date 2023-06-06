/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { SVGComponent as ComponentSVG } from 'aesirx-uikit';
import React, { Component } from 'react';
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
        <div className="selection-grid d-flex justify-content-center flex-wrap">
          <div className="selection-grid-item">
            <div className="p-24 bg-white border rounded-2 h-100">
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
          </div>
          <div className="d-flex align-items-center justity-content-center m-24 text-center">
            <div className="mx-auto">
              <ComponentSVG
                url="/assets/images/switch-line.png"
                className={`bg-black`}
                width={'32px'}
                height={'32px'}
              />
            </div>
          </div>
          <div className="selection-grid-item">
            <div className="p-24 bg-white border rounded-2 h-100">
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
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation()(FormSelectionColumn);
