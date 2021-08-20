import { Card, Col, Popover, Row, message } from 'antd';
import React, { useState, Fragment, useRef } from 'react';
import ProForm, {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import Detail from './components/TableForm';
import moment from 'moment';
import { DatePicker, Space } from 'antd';

const fieldLabels = {
  name: 'Election name',
  owner: 'Description',
  dateRange: 'Duration',
};
const tableData = [
  {
    key: '1',
    party: 'Conservative',
    name: 'John Brown',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    party: 'Labour',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    party: 'SNP',
    name: 'Joe Black',
    address: 'Sidney No. 1 Lake Park',
  },
];

const VoteSetup = ({ update }) => {
  const onCandidateChange = (e) => {
    update(e);
    console.log(e);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  return (
    <Fragment>
      <Row gutter={12}>
        <Col lg={24} md={24} sm={24}>
          <div style={{ marginBottom: '10px' }}>{fieldLabels.name}</div>

          <ProFormText
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the election title!',
              },
            ]}
            placeholder="Please input the election title!"
          />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col lg={12} md={12} sm={12}>
          <div style={{ marginBottom: '10px' }}>Register Phase Starts at:</div>
          <ProFormDateTimePicker
            name="register"
            showTime={{
              hideDisabledOptions: true,
            }}
            disabledDate={disabledDate}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            rules={[
              {
                required: true,
                message: 'Please select the duration of this election!',
              },
            ]}
          />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <div style={{ marginBottom: '10px' }}>Register Phase Ends at:</div>
          <ProFormDateTimePicker
            name="registerEnd"
            showTime={{
              hideDisabledOptions: true,
            }}
            disabledDate={disabledDate}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            rules={[
              {
                required: true,
                message: 'Please select the duration of this election!',
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col lg={12} md={12} sm={12}>
          <div style={{ marginBottom: '10px' }}>Voting Phase Starts at:</div>
          <ProFormDateTimePicker
            name="startTime"
            showTime={{
              hideDisabledOptions: true,
            }}
            disabledDate={disabledDate}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            rules={[
              {
                required: true,
                message: 'Please select the duration of this election!',
              },
            ]}
          />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <div style={{ marginBottom: '10px' }}>Voting Phase Ends at:</div>
          <ProFormDateTimePicker
            name="endTime"
            showTime={{
              hideDisabledOptions: true,
            }}
            disabledDate={disabledDate}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            rules={[
              {
                required: true,
                message: 'Please select the duration of this election!',
              },
            ]}
          />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <div style={{ marginBottom: '10px' }}>Break All Votes at:</div>
          <ProFormDateTimePicker
            name="break"
            showTime={{
              hideDisabledOptions: true,
            }}
            disabledDate={disabledDate}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            rules={[
              {
                required: true,
                message: 'Please select the duration of this election!',
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col lg={24} md={24} sm={24}>
          <div style={{ marginBottom: '10px' }}>{fieldLabels.owner}</div>
          <ProFormTextArea
            name="Description"
            rules={[
              {
                required: true,
                message: 'Please input the description',
              },
            ]}
            placeholder="Please input the description"
          />
        </Col>
      </Row>
      <h3 style={{ marginBottom: '10px' }}>Candidate Management</h3>
      <Detail value={tableData} onChange={onCandidateChange} />
    </Fragment>
  );
};

export default VoteSetup;
