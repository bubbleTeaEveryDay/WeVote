import React, { useRef, useState } from 'react';
import { Card, Result, Table, Button, Divider, Alert, message, Upload } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';

import ProForm, {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';

import styles from './style.less';
import axios from 'axios';
import ProCard from '@ant-design/pro-card';
import { vote } from '../../services/mock-api/api';
const { Column, ColumnGroup } = Table;
const { Dragger } = Upload;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name) => <b>{name}</b>,
    // width: '20%',
  },
  {
    title: 'Party',
    dataIndex: 'party',
    // width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const StepResult = (props) => {
  return (
    <Result
      status="success"
      title="Credential Generated Successfully!"
      subTitle="Please wait for the voting stage"
      className={styles.result}
    >
      <h4>You can use the Hash of this transaction to check the submission:</h4>
      <div>
        QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
        bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi
      </div>
      {/* {props.children} */}
    </Result>
  );
};

const StepForm = () => {
  let ID = -1;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const formRef = useRef();

  async function fetch(i) {
    console.log(`fetching:${i}`);
    setLoading(true);
    let receive = await axios.get(`https://60ef0447f587af00179d387b.mockapi.io/election/${i}`);
    let currentTime = new Date();
    let startTime = new Date(receive.data.startAt);
    let endTime = new Date(receive.data.endAt);
    if (currentTime > startTime && currentTime < endTime) {
      setLoading(false);
      setData(receive.data.num);
      return true;
    } else {
      message.error('The poll has not started or has finished!');
      return false;
    }
  }
  const onSelectChange = (selectedRowKeys) => {
    ID = selectedRowKeys[0];
    console.log('selectedRowKeys changed: ', ID);

    // this.setState({ selectedRowKeys });
  };
  return (
    <ProCard>
      <Card bordered={false}>
        <div className={styles.desc}>
          <h3>Welcome to use WeVote!</h3>
          <h4>Phase 1: Registration</h4>

          <h4>Phase 2: Credential Generation</h4>

          <h4>Phase 3: Commitment Phase</h4>
          <h4>Phase 4: Ballot Opening</h4>
        </div>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              // console.log(props, dom);
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={formRef}
            title="Upload Credential"
            onFinish={async ({ name }) => {
              console.log(name);
              let success = await fetch(8);
              return success;
            }}
            // onFinish={async (values) => {
            //   await fetch(20);
            //   return true;
            // }}
          >
            <ProFormText
              label="UUID"
              width="md"
              name="UUID"
              rules={[
                {
                  required: true,
                  message: 'Please input your UUID',
                },
              ]}
            />
            <ProFormTextArea
              label="Private Key"
              width="md"
              name="privateKey"
              rules={[
                {
                  required: true,
                  message: 'Please input your privateKey',
                },
              ]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Finish">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            ></StepResult>
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </ProCard>
  );
};

export default StepForm;
