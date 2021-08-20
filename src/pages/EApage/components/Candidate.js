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
    title: 'No. of Votes',
    dataIndex: 'num',
    hideInForm: true,
    sorter: (a, b) => a.num - b.num,
    sortDirections: ['descend', 'ascend'],
  },
];
const columns2 = [
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
];
export default class candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetch(this.props.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      this.fetch(nextProps.id);
    }
  }

  handleClick = (e) => {
    console.log('Content: ', e);
  };

  handleTableChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  fetch = (i) => {
    console.log(`fetching:${i}`);
    this.setState({ loading: true });
    axios({
      url: `https://60ef0447f587af00179d387b.mockapi.io/election/${i}/candidate`,
      method: 'get',
      type: 'json',
    }).then((receive) => {
      // console.log(`fetching complete!:${receive.data[0].electionId}`);
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
        columns={this.props.over ? columns : columns2}
        rowKey="key"
        dataSource={data}
        loading={loading}
        onChange={this.handleTableChange}
        pagination={{ position: ['none'] }}
      />
    );
  }
}
