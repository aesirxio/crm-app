import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { SVGComponent as ComponentSVG } from 'aesirx-uikit';
import './index.scss';
import DeletePopup from 'components/DeletePopup';
const ActionsBar = ({ t, buttons = [] }) => {
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  return (
    <div className="d-flex align-items-center">
      {buttons.map((item, key) => {
        return (
          <div key={key} className="ms-15">
            <Button
              variant={`${item.variant ? item.variant : 'light'}`}
              className={`${
                item.title === t('txt_cancel') ? 'text-danger' : ''
              } px-16 fw-semibold d-flex align-items-center rounded-1`}
              onClick={async () => {
                if (item?.isShowPopupDelete) {
                  let isShowPopup = await item.isShowPopupDelete();
                  if (isShowPopup) {
                    setShowPopupDelete(true);
                  }
                } else {
                  item.handle();
                }
              }}
            >
              {item.icon && (
                <ComponentSVG
                  color={item.iconColor}
                  url={item.icon}
                  className={`icon-${item.variant ? item.variant : 'light'} me-1`}
                />
              )}
              <span style={{ color: item.textColor }}>{item.title}</span>
            </Button>
            {item?.isShowPopupDelete && (
              <DeletePopup
                showPopupDelete={showPopupDelete}
                closePopupDelete={() => {
                  setShowPopupDelete(false);
                }}
                handleDelete={() => {
                  item.handle();
                  setShowPopupDelete(false);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default withTranslation()(ActionsBar);
