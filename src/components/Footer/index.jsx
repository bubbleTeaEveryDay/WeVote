import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'An implementation of E-cclesia protocol',
  });
  return (
    <DefaultFooter
      copyright={'An implementation of E-cclesia protocol'}
      links={[
        {
          key: 'University of Edinburgh',
          title: 'University of Edinburgh',
          href: 'https://www.ed.ac.uk/',
          blankTarget: true,
        },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        // {
        //   key: 'E-cclesia',
        //   title: 'E-cclesia',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]}
    />
  );
};
