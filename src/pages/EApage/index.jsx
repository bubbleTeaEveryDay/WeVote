import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import VoteSetup from './VoteSetup';
import moment from 'moment';

import Candidate from './components/Candidate';
import { getElection, addElection, removeElection } from '@/services/mock-api/api';

const handleAdd = async (election, candidate) => {
  const hide = message.loading('Adding...');
  let submitElection = {};
  submitElection.name = election['name'];
  submitElection.desc = election['Description'];
  submitElection.startAt = moment(election['startTime']).utc().format();
  submitElection.endAt = moment(election['endTime']).utc().format();
  submitElection.register = moment(election['register']).utc().format();
  submitElection.break = moment(election['break']).utc().format();

  try {
    await addElection(submitElection, candidate);
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (record) => {
  const hide = message.loading('Deleteing...');

  try {
    await removeElection(record.key);
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [createVisible, setCreateVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [CurrentRowDetail, setCurrentRowDetail] = useState();
  let candidateList = [];
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      tip: 'The id should be unique',
    },
    {
      title: 'Election name',
      dataIndex: 'name',

      render: (dom, record, entity) => {
        return <b>{dom}</b>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    // {
    //   title: 'No. of Votes',
    //   dataIndex: 'num',
    //   hideInForm: true,
    //   renderText: (text, record, index) => {
    //     let sum = 0;
    //     for (let i = 0; i < record.num.length; i++) {
    //       sum = sum + record.num[i].num;
    //     }
    //     return sum.toString();
    //   },
    // },
    {
      title: 'Register Start',
      sorter: (a, b) => new Date(a.startAt) - new Date(b.startAt),
      dataIndex: 'register',
      valueType: 'dateTime',
    },
    {
      title: 'Register End',
      sorter: (a, b) => new Date(a.startAt) - new Date(b.startAt),
      dataIndex: 'registerEnd',
      valueType: 'dateTime',
    },
    {
      title: 'Vote Start',
      sorter: (a, b) => new Date(a.startAt) - new Date(b.startAt),
      dataIndex: 'startAt',
      valueType: 'dateTime',
    },
    {
      title: 'Vote End',
      sorter: (a, b) => new Date(a.endAt) - new Date(b.endAt),
      dataIndex: 'endAt',
      valueType: 'dateTime',
    },
    {
      title: 'Break All Votes',
      sorter: (a, b) => new Date(a.endAt) - new Date(b.endAt),
      dataIndex: 'break',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'status',
      sorter: (a, b) => a.status - b.status,
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Not started',
          status: 'Default',
        },
        1: {
          text: 'Register',
          status: 'Processing',
        },
        2: {
          text: 'Voting',
          status: 'Processing',
        },
        3: {
          text: 'Opening',
          status: 'Warning',
        },
        4: {
          text: 'Finished',
          status: 'Success',
        },
      },
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.status === 0) {
          return [
            <a
              key="config"
              onClick={() => {
                setShowDetail(true);
                setCurrentRowDetail(record);
              }}
            >
              View
            </a>,
            <Popconfirm
              title="Do you want to delete this line?"
              onConfirm={() => handleRemove(record)}
            >
              <a>Delete</a>
            </Popconfirm>,
            // <a
            //   key="config2"
            //   onClick={() => {
            //     handleRemove(record);
            //   }}
            // >
            //   Delete
            // </a>,
          ];
        } else if (record.status === 1 || record.status === 2 || record.status === 3) {
          return [
            <a
              key="config"
              onClick={() => {
                setShowDetail(true);
                setCurrentRowDetail(record);
              }}
            >
              View
            </a>,
            <a
              key="config2"
              disabled
              onClick={() => {
                message.error('Cannot delete already started polls');
              }}
            >
              Delete
            </a>,
          ];
        } else {
          return [
            <a
              key="config"
              onClick={() => {
                setShowDetail(true);
                setCurrentRowDetail(record);
              }}
            >
              Results
            </a>,
            <a
              key="config"
              disabled
              onClick={() => {
                message.error('Cannot delete already started polls');
              }}
            >
              Delete
            </a>,
          ];
        }
      },
    },
  ];
  const getChild = (result) => {
    candidateList = [...result];
    console.log('CandidateList Change:', ...candidateList);
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined /> New Election
          </Button>,
        ]}
        request={getElection}
        columns={columns}
      />

      <ModalForm
        title="Set up a new election"
        //  formRef={formRef}
        width="800px"
        visible={createVisible}
        onVisibleChange={setCreateVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        submitter={{
          searchConfig: {
            resetText: 'Cancel',
          },
          onReset: () => {
            setShowDetail(false);
          },
        }}
        onFinish={async (value) => {
          console.log(value);
          const res = await handleAdd(value, candidateList);
          if (res) {
            message.success('Election setup successfully, please refresh the table!');

            return true;
          }
        }}
      >
        <VoteSetup update={getChild} />
      </ModalForm>

      <ModalForm
        title={CurrentRowDetail?.name}
        width="800px"
        visible={showDetail}
        onVisibleChange={setShowDetail}
        submitter={{
          searchConfig: {
            resetText: 'OK',
          },
          resetButtonProps: {
            // style: {
            //   // 隐藏重置按钮
            //   display: 'none',
            // },
          },
          onReset: () => {
            setShowDetail(false);
          },
          render: (props, defaultDoms) => {
            return defaultDoms[0];
          },
        }}
      >
        <Candidate
          id={CurrentRowDetail?.key}
          over={CurrentRowDetail?.status === 4 ? true : false}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
