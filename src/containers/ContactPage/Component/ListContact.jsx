import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withContactViewModel } from '../ContactViewModel/ContactViewModelContextProvider';
import Table from 'components/Table';
import { Spinner } from 'aesirx-uikit';
import ActionsBar from 'components/ActionsBar';

import { Tab, Tabs } from 'react-bootstrap';
import { AesirXSelect as SelectComponent } from 'aesirx-uikit';
import { notify, history } from 'aesirx-uikit';

const ListContact = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

  useEffect(() => {
    viewModel.clearFilter();
    viewModel.initializeData();
    viewModel.getListPublishStatus();
  }, []);
  const columnsTable = [
    {
      Header: 'Id',
      accessor: 'id',
      width: 60,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <div className="opacity-80">{value}</div>;
      },
    },
    {
      Header: t('txt_name'),
      accessor: 'name',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value, row }) => {
        return (
          <div className="py-8px">
            <div className="mb-1">{value}</div>
            <div className="text-green">
              <button
                onClick={() => {
                  history.push(`/contacts/edit/${row.cells[1].value}`);
                }}
                className="p-0 border-0 bg-transparent d-inline-block text-green"
              >
                {t('txt_edit')}
              </button>
            </div>
          </div>
        );
      },
    },
    {
      Header: t('txt_email'),
      accessor: 'email',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_phone'),
      accessor: 'phone',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return <>{value}</>;
      },
    },
    {
      Header: t('txt_create_date'),
      accessor: 'createDate',
      width: 250,
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
      Header: t('txt_last_modified'),
      accessor: 'lastModified',
      width: 250,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <div className="pe-2">
            <div>
              {value.date} {t('txt_by')} {value.by}
            </div>
          </div>
        );
      },
    },
  ];

  const selectBulkActionsHandler = (value) => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.updateStatus(listSelected, value.value);
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

  const selectPageHandler = (value) => {
    if (value != viewModel.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter('list[start]', (value - 1) * viewModel.pagination.pageLimit);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h2 className="fw-bold mb-0">{t('txt_contact')}</h2>
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
                viewModel.deleteContacts(listSelected);
              },
            },
            {
              title: t('txt_add_new_contact'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                history.push('/contacts/add');
              },
            },
          ]}
        />
      </div>

      {viewModel?.listPublishStatus.length > 0 && (
        <>
          <Tabs
            defaultActiveKey={'default'}
            id="tab-setting"
            onSelect={(k) => selectTabHandler(k)}
            className="mb-3"
          >
            <Tab eventKey={'default'} title={t('txt_all_contact')} />
            {viewModel?.listPublishStatus.map((o) => (
              <Tab
                key={o.value}
                eventKey={o.value}
                title={t(`txt_${o?.label && o.label?.toString().toLowerCase()}`)}
              />
            ))}
          </Tabs>

          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex gap-2">
              <SelectComponent
                options={viewModel?.listPublishStatus}
                className={`fs-sm`}
                isBorder={true}
                pagination={viewModel?.pagination}
                placeholder={t('txt_bulk_actions')}
                onChange={(o) => selectBulkActionsHandler(o)}
                arrowColor={'var(--dropdown-indicator-color)'}
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="text-gray me-2">{t('txt_showing')}</div>
              <SelectComponent
                defaultValue={{
                  label: `${viewModel?.filter['list[limit]']} ${t('txt_items')}`,
                  value: viewModel?.filter['list[limit]'],
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
          columns={columnsTable}
          data={viewModel?.transform(viewModel?.items)}
          selection={false}
          pagination={viewModel?.pagination}
          selectPage={selectPageHandler}
          currentSelect={currentSelectHandler}
        ></Table>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export default withTranslation()(withContactViewModel(ListContact));
