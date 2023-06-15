import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { withEmailViewModel } from '../EmailViewModel/EmailViewModelContextProvider';
import Table from 'components/Table';
import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import { Tab, Tabs } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import ActionsBar from 'components/ActionsBar';
import { notify, Spinner } from 'aesirx-uikit';
import { historyPush } from 'routes/routes';

const List = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.initializeData();
  }, []);

  const selectPageHandler = (value) => {
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'list[start]',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
  };

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.original.id);
  };
  const selectTabHandler = (value) => {
    viewModel.isLoading();
    if (value != 'default') {
      viewModel.getListByFilter('state', {
        value: value,
        type: 'filter',
      });
    } else {
      viewModel.getListByFilter('state', '');
    }
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value.value);
  };

  const selectBulkActionsHandler = (value) => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.updateStatus(listSelected, value.value);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="fw-bold mb-0">{t('txt_left_menu_list_email')}</h2>
        <ActionsBar
          buttons={[
            {
              title: t('txt_delete'),
              icon: '/assets/images/delete.svg',
              iconColor: '#cb222c',
              textColor: '#cb222c',
              isShowPopupDelete: async () => {
                if (listSelected?.length < 1) {
                  notify(t('txt_row_select_error'), 'error');
                  return false;
                }
                return true;
              },
              handle: async () => {
                viewModel.isLoading();
                viewModel.deleteEmails(listSelected);
              },
            },
            {
              title: t('txt_create_new') + ' ' + t('txt_email'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/email/add');
              },
            },
          ]}
        />
      </div>
      {viewModel?.successResponse?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_email')} />
            <Tab key={1} eventKey={1} title={t('txt_published')} />
            <Tab key={0} eventKey={0} title={t('txt_unpublished')} />
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex gap-2">
              <SelectComponent
                options={viewModel?.successResponse?.listPublishStatus}
                className={`fs-sm`}
                isBorder={true}
                placeholder={t('txt_bulk_actions')}
                onChange={(o) => selectBulkActionsHandler(o)}
                arrowColor={'var(--dropdown-indicator-color)'}
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="text-gray me-2">{t('txt_showing')}</div>
              <SelectComponent
                defaultValue={{
                  label: `${viewModel?.successResponse?.filters['list[limit]']} ${t('txt_items')}`,
                  value: viewModel?.successResponse?.filters['list[limit]'],
                }}
                options={[...Array(9)].map((o, index) => ({
                  label: `${(index + 1) * 10} ${t('txt_items')}`,
                  value: (index + 1) * 10,
                }))}
                onChange={(o) => selectShowItemsHandler(o)}
                className={`fs-sm`}
                isBorder={true}
                placeholder={`Select`}
                arrowColor={'var(--dropdown-indicator-color)'}
              />
            </div>
          </div>
        </>
      )}
      {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded table-striped table`}
          columns={[
            {
              Header: 'Id',
              accessor: 'id',
              width: 60,
              className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
              Cell: ({ value }) => {
                return <div>{value}</div>;
              },
            },
            {
              Header: t('txt_name'),
              accessor: 'name',
              width: 300,
              className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
              Cell: ({ value }) => {
                return (
                  <div className="d-flex align-items-center">
                    <div>{value}</div>
                  </div>
                );
              },
            },

            {
              Header: t('txt_author'),
              accessor: 'author',
              width: 150,
              className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
              Cell: ({ value }) => {
                return (
                  <div className="pe-2">
                    <div>{value}</div>
                  </div>
                );
              },
            },
            {
              Header: t('txt_send_date'),
              accessor: 'sendDate',
              width: 150,
              className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
              Cell: ({ value }) => {
                return (
                  <div className="pe-2">
                    <div>{value}</div>
                  </div>
                );
              },
            },
          ]}
          data={viewModel?.successResponse?.listEmail}
          selection={false}
          pagination={viewModel?.successResponse?.pagination}
          selectPage={selectPageHandler}
          currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export default withTranslation()(withEmailViewModel(List));
