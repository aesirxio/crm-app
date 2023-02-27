import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';

const DeletePopup = ({ showPopupDelete, closePopupDelete, handleDelete }) => {
  const { t } = useTranslation('common');

  return (
    <Modal show={showPopupDelete} onHide={closePopupDelete} centered={true}>
      <div className="py-5 py-6 mx-auto">
        <div className="d-flex justify-content-center mb-15">
          <img
            alt="circle-close.png"
            src="/assets/images/circle-close.png"
            width={77}
            height={77}
          />
        </div>
        <Modal.Body className="p-0 pt-1 text-center">
          <h4 className="fw-bold mb-8px">{t('txt_you_sure')}</h4>
          <p className="fs-sm">{t('txt_complete_delete')}</p>
          <div className="d-flex justify-content-center mt-24">
            <Button
              className="btn btn-light border py-12 px-3 rounded-1"
              onClick={() => closePopupDelete()}
            >
              {t('txt_cancel')}
            </Button>
            <Button
              className="btn btn-danger ms-16 px-16 py-12 rounded-1"
              onClick={() => handleDelete()}
            >
              {t('txt_yes_delete')}
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default DeletePopup;
