import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { withOpportunityViewModel } from '../OpportunityViewModel/OpportunityViewModelContextProvider';
import ActionsBar from 'components/ActionsBar';
import { Tab, Tabs } from 'react-bootstrap';
import Table from 'components/Table';

import { AesirXSelect as SelectComponent, Spinner, notify, history } from 'aesirx-uikit';
import { Helper } from 'aesirx-lib';
import { historyPush } from 'routes/routes';

const ListOpportunities = observer((props) => {
  const { t } = props;
  let listSelected = [];

  const viewModel = props.viewModel;

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
      Header: t('txt_opportunity_name'),
      accessor: 'opportunity',
      width: 150,
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi align-middle',
      Cell: ({ value }) => {
        return (
          <>
            <div className="d-flex align-items-center py-8px">
              <div>
                <div className="mb-1">{value?.name}</div>
                <div className="text-green">
                  <button
                    onClick={() => {
                      historyPush(`/opportunity/edit/${value?.id}`);
                    }}
                    className="p-0 border-0 bg-transparent d-inline-block text-green"
                  >
                    {t('txt_edit')}
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      Header: t('txt_company_name'),
      accessor: 'companyName',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div>{value.name}</div>;
      },
    },
    {
      Header: t('txt_contact_name'),
      accessor: 'contactName',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return (
          <>
            {Array.isArray(value) &&
              value?.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="text-success cursor-pointer"
                    onClick={() => {
                      historyPush(`/contacts/edit/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
          </>
        );
      },
    },
    {
      Header: t('txt_amount'),
      accessor: 'amount',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div>{Helper.numberWithCommas(value) ?? 0} VND</div>;
      },
    },
    {
      Header: t('txt_expect_date'),
      accessor: 'expectDate',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div>{value}</div>;
      },
    },
    {
      Header: t('txt_sale_stage'),
      accessor: 'saleStage',
      className: 'py-18 text-gray border-bottom-1 text-uppercase fw-semi',
      Cell: ({ value }) => {
        return <div className={``}>{value?.name}</div>;
      },
    },
  ];

  useEffect(() => {
    viewModel.clearFilter();
    viewModel.getListPublishStatus();
    viewModel.initializeData();
  }, []);

  const selectBulkActionsHandler = (value) => {
    if (listSelected.length < 1) {
      notify(t('txt_row_select_error'), 'error');
    } else {
      viewModel.isLoading();
      viewModel.updateStatus(listSelected, value.value);
    }
  };

  const selectShowItemsHandler = (value) => {
    viewModel.isLoading();
    viewModel.getListByFilter('list[limit]', value.value);
  };

  const selectPageHandler = (value) => {
    if (value != viewModel.successResponse.pagination.page) {
      viewModel.isLoading();
      viewModel.getListByFilter(
        'list[limitstart]',
        (value - 1) * viewModel.successResponse.pagination.pageLimit
      );
    }
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

  const currentSelectHandler = (arr) => {
    listSelected = arr.map((o) => o.original.id);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="fw-bold mb-1">{t('txt_list_opportunity')}</h2>
        </div>
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
                viewModel.deleteOpportunities(listSelected);
              },
            },
            {
              title: t('txt_add_new'),
              icon: '/assets/images/plus.svg',
              variant: 'success',
              handle: async () => {
                historyPush('/opportunity/add');
              },
            },
          ]}
        />
      </div>

      <Tabs
        defaultActiveKey={'default'}
        id="tab-setting"
        onSelect={(k) => selectTabHandler(k)}
        className="mb-3"
      >
        <Tab eventKey={'default'} title={t('txt_all_opportunity')} />
        {viewModel?.successResponse?.listPublishStatus.map((o) => (
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
            options={viewModel?.successResponse?.listPublishStatus}
            className={`fs-sm`}
            isBorder={true}
            pagination={viewModel?.successResponse?.pagination}
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

      {viewModel?.successResponse?.state ? (
        <Table
          classNameTable={`bg-white rounded table-striped table`}
          columns={columnsTable}
          data={viewModel?.successResponse?.listOpportunities}
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

export default withTranslation()(withOpportunityViewModel(ListOpportunities));
