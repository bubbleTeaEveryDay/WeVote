import React, { Component } from 'react';
import { Table, Space, Button } from 'antd';
import axios from 'axios';
const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name) => <b>{name}</b>,
    width: '20%',
  },
  {
    title: 'Party',
    dataIndex: 'party',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record, index) => (
      <Button
        onClick={(e) => {
          console.log('corresponding candidate is :', record.id);
        }}
      >
        {' '}
        Vote{' '}
      </Button>
    ),
  },
];

export default class candidate extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleClick = (e) => {
    console.log('Content: ', e);
  };

  handleTableChange = (filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = () => {
    this.setState({ loading: true });
    axios({
      url: 'https://60ef0447f587af00179d387b.mockapi.io/election/1/candidate',
      method: 'get',
      type: 'json',
    }).then((receive) => {
      console.log(receive);
      this.setState({
        loading: false,
        data: receive.data,
      });
    });
  };

  render() {
    const { data, loading } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={(data) => data.id}
        dataSource={data}
        loading={loading}
        onChange={this.handleTableChange}
        pagination={{ position: ['none'] }}
        // onRow={(record) => {
        //   return {
        //     onClick: (e) => {
        //       console.log("Content: ", e.currentTarget);
        //     }, // 点击行
        //   };
        // }}
      />
    );
    // return (
    //   <Table dataSource={data} loading={loading}>
    //     <Column title="Name" dataIndex="name" key="name" width="20%" />
    //     <Column title="Party" dataIndex="party" key="party" width="20%" />
    //     <Column title="Address" dataIndex="address" key="address" />
    //     <Column
    //       title="Action"
    //       key="action"
    //       render={() => (
    //         <Space size="middle">
    //           <a onClickCapture={this.handleClick}>Vote</a>
    //         </Space>
    //       )}
    //     />
    //   </Table>
    // );
  }
}
