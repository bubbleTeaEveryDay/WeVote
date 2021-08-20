import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Typography>
          <Title>Introduction</Title>
          <Paragraph></Paragraph>
          <Paragraph>
            Welcome to the <Text strong> WeVote </Text> client, a voting tool based on the E-cclesia
            protocol.
          </Paragraph>
          <Title level={2}>Guidelines</Title>
          <Paragraph>
            <Title level={4}>Phase 1: Election Setup and Voter Registration</Title>
            <Paragraph></Paragraph>
            <Title level={4}>Phase 2: Credential Generation</Title>
            <Paragraph></Paragraph>
            <Title level={4}>Phase 3: Vote Commitment</Title>
            <Paragraph></Paragraph>
            <Title level={4}>Phase 4: Ballot Opening</Title>
            <Paragraph></Paragraph>
          </Paragraph>
        </Typography>
      </Card>
    </PageContainer>
  );
};
