import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { useState } from 'react';
import styles from '../style.less';

const TableForm = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);
  const [addNew, setAddNew] = useState(true);

  const getRowByKey = (key, newData) => (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);

    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }

      target.editable = !target.editable;
      setData(newData);
    }
  };
  const noNewMember = () => {
    message.error('Only one row can be added at a time!');
  };
  const newMember = () => {
    setAddNew(false);
    const newData = data?.map((item) => ({ ...item })) || [];
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      party: '',
      name: '',
      address: '',
      editable: true,
      isNew: true,
    });
    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key) => {
    const newData = data?.filter((item) => item.key !== key);
    setData(newData);

    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (e, fieldName, key) => {
    const newData = [...data];
    const target = getRowByKey(key, newData);

    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e, key) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }

      const target = getRowByKey(key) || {};

      if (!target.party || !target.name || !target.address) {
        message.error('Please complete the candidate information.');
        e.target.focus();
        setLoading(false);
        return;
      }

      delete target.isNew;
      toggleEditable(e, key);

      if (onChange) {
        onChange(data);
      }

      setLoading(false);
    }, 500);
    setAddNew(true);
  };

  const handleKeyPress = (e, key) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e, key) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...data]; // 编辑前的原始数据

    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = { ...item, ...cacheOriginData[key], editable: false };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }

      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Name"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'Party',
      dataIndex: 'party',
      key: 'party',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'party', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Party"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '40%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'address', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="Address"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        if (!!record.editable && loading) {
          return null;
        }

        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>Add</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Do you want to delete this line?"
                  onConfirm={() => remove(record.key)}
                >
                  <a>Delete</a>
                </Popconfirm>
              </span>
            );
          }

          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>Save</a>
              <Divider type="vertical" />
              <a onClick={(e) => cancel(e, record.key)}>Cancel</a>
            </span>
          );
        }

        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Do you want to delete this line?"
              onConfirm={() => remove(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{
          width: '100%',
          marginTop: 16,
          marginBottom: 8,
        }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        Add Candidate
      </Button>
    </>
  );
};

export default TableForm;
