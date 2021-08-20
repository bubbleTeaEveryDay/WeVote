import React, { useRef, useState } from 'react';
import { Card, Result, Table, Button, Divider, Alert, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import styles from './style.less';
import axios from 'axios';
import ProCard from '@ant-design/pro-card';
import { vote } from '../../services/mock-api/api';
const { Column, ColumnGroup } = Table;

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
      title="Register Successfully!"
      subTitle="Please wait for the voting stage"
      className={styles.result}
    >
      <h4>You can use the Hash of this transaction to check the register status:</h4>
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
  const formRef2 = useRef();

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
  const onFill = () => {
    formRef2?.current?.setFieldsValue({
      uuid: 'a62345b1-05eb-406b-93c6-275a028265d4',
      private: `-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAMS5CL7HncygKlDjxj8XUqA7JrqTw/lTUIEiAtQ6rtV1pExIh/vV
m2gP7JsTSIib0eWBBizauMHx0d2EdIw02I0CAwEAAQJAMcMkpS3ViueRDLkxctAx
hHqyB0xNrIoYuTGjSZA2naQchpkXF4YGytR96FUShH2U/B46iwu5+yDQkp8wY/Sh
eQIhAPcDu6Ke1DAho25iuU/CZSAIo8LiyOMrS0n9MFDxUGAnAiEAy+D4aLRr9wtS
ggl8Hd+BoNG6KwaFgtYTF/279NwC/isCIQDUEkZj5czyzc6MlQHYcmNzzzcZuK8U
KjVnfpKey69f/QIgGEidjesfiPdiRnbWv8AlcoBIimNmd6UD9TGVt56VBK0CIQCg
06z95Rt6O5Y6SUjozRBaEeqj0v5P/djhu4zz6xpL4w==
-----END RSA PRIVATE KEY-----`,
      public: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMS5CL7HncygKlDjxj8XUqA7JrqTw/lT
UIEiAtQ6rtV1pExIh/vVm2gP7JsTSIib0eWBBizauMHx0d2EdIw02I0CAwEAAQ==
-----END PUBLIC KEY-----`,
    });
  };

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
          // submitter={{
          //   resetButtonProps: {
          //     style: {
          //       display: 'none',
          //     },
          //   },
          //   render: (props, dom) => {
          //     if (props.step === 2) {
          //       return null;
          //     }
          //     // console.log(props, dom);
          //     return dom;
          //   },
          // }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return [
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    Download the UUID and Keys
                  </Button>,
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    Next {'>'}
                  </Button>,
                ];
              }

              if (props.step === 1) {
                return [
                  <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                    Submit the UUID and Public Key {'>'}
                  </Button>,
                ];
              }

              return [];
            },
          }}
        >
          <StepsForm.StepForm
            formRef={formRef}
            title="Generate UUID and Keys"
            onFinish={async ({ name }) => {
              console.log(name);
              // let success = await fetch(4);
              return true;
            }}
            // onFinish={async (values) => {
            //   await fetch(20);
            //   return true;
            // }}
          >
            <h3
              style={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              Step 1: Generate your UUID and Key pair
            </h3>
            <Button type="primary" onClick={onFill}>
              {' '}
              Generate UUID and Key Pair
            </Button>
            <Divider
              style={{
                margin: '40px 0 24px',
              }}
            />
            <h3
              style={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              Step 2: Save or <a>Download</a> your UUID and Private Key!{' '}
            </h3>

            <ProForm
              width="xl"
              title="Register Form"
              formRef={formRef2}
              submitter={{
                render: (props, doms) => {
                  return [];
                },
              }}
            >
              <ProFormText name="uuid" label="UUID" allowClear={false} />

              <ProFormTextArea name="private" label="Private Key" autoSize={true} />

              <ProFormTextArea name="public" label="Public Key" autoSize={true} />
            </ProForm>
          </StepsForm.StepForm>

          <StepsForm.StepForm
            title="Submit the UUID and Public Key"
            onFinish={async (value) => {
              // let success = await vote(4, ID);
              return true;
            }}
          >
            <ProFormText
              // width="xl"
              name="uuid"
              label="UUID"
              initialValue="a62345b1-05eb-406b-93c6-275a028265d4"
              disabled
              allowClear={false}
            />

            <ProFormTextArea
              width="xl"
              name="public"
              label="Public Key"
              autoSize={true}
              initialValue="-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMS5CL7HncygKlDjxj8XUqA7JrqTw/lT
UIEiAtQ6rtV1pExIh/vVm2gP7JsTSIib0eWBBizauMHx0d2EdIw02I0CAwEAAQ==
-----END PUBLIC KEY-----"
              disabled
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
