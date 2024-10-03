import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Table,
  Modal,
  Select,
  DatePicker,
  InputNumber,
  Popconfirm
} from 'antd'
import './user.css'
import { getUser, addUser, editUser, deleteUser } from '../../api'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'


const User = () => {
  const [listData, setListData] = useState({
    name: ""
  })
  const [tableData, setTableData] = useState([])

  const [modalType, setModalType] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchForm] = useForm() 

  const handleSearch = (val) => {
    console.log(val, 'val')
    setListData({
      name: val.keyword
    })
	
  }
  useEffect(() => {
	  getTableData()
  }, [listData])

  const [form] = useForm()
  const handleClick = (type, rowData) => {
    setIsModalOpen(true)
    if (type === 'add') {
      setModalType(0)
    } else {
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(rowData.birth)
      setModalType(1)
      form.setFieldsValue(cloneData)
    }
  }
  const handleDelete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData()
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleOk = () => {
    form.validateFields().then((val) => {

      val.birth = dayjs(val.birth).format('YYYY-MM-DD')
      if (modalType) { 
        editUser(val).then(() => {

          handleCancel()
          getTableData()
        })
      } else { 
        addUser(val).then(() => {

          handleCancel()
          getTableData()
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list)
    })
  }
  const columns = [
    {
      title: 'Name', 
      dataIndex: 'name'
    },
    {
      title: 'Age', 
      dataIndex: 'age'
    },
    {
      title: 'Gender', 
      dataIndex: 'sex',
      render: (val) => {
        return val ? 'Female' : 'Male' 
      }
    },
    {
      title: 'Birth Date', 
      dataIndex: 'birth'
    },
    {
      title: 'Address', 
      dataIndex: 'addr'
    },
    {
      title: 'Action', 
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button style={{marginRight: '5px'}} onClick={() => handleClick('edit', rowData)}>Edit</Button> 
            <Popconfirm
              title="Tip" 
              description="This action will delete the user, do you want to continue?" 
              okText="Confirm" 
              cancelText="Cancel" 
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>Delete</Button> 
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('add')}>+ Add</Button>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item
            name="keyword"
          >
            <Input placeholder="Please enter username" /> 
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">Search</Button> 
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={"id"}
      />
      <Modal
        open={isModalOpen}
        title={modalType ? 'Edit User' : 'Add User'} 
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK" 
        cancelText="Cancel" 
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          { modalType == 1 &&
            <Form.Item
              name="id"
              hidden
            >
              <Input/>
            </Form.Item>
          }
          <Form.Item
            label="Name" 
            name="name"
            rules={[ 
              {
                required: true,
                message: 'Please enter name', 
              },
            ]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
          <Form.Item
            label="Age" 
            name="age"
            rules={[ 
              {
                type: 'number',
                message: 'Age must be a number', 
              },
              {
                required: true,
                message: 'Please enter age', 
              },
            ]}
          >
            <InputNumber placeholder="Please enter age" />
          </Form.Item>
          <Form.Item
            label="Gender" 
            name="sex"
            rules={[ 
              {
                required: true,
                message: 'Gender is required', 
              },
            ]}
          >
            <Select
              placeholder="Please select gender" 
              options={[
                { value: 0, label: 'Male' }, 
                { value: 1, label: 'Female' } 
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Birth Date" 
            name="birth"
            rules={[ 
              {
                required: true,
                message: 'Please select birth date', 
              },
            ]}
          >
            <DatePicker placeholder="Please select" format="YYYY/MM/DD" /> 
          </Form.Item>
          <Form.Item
            label="Address" 
            name="addr"
            rules={[ 
              {
                required: true,
                message: 'Please fill in the address', 
              },
            ]}
          >
            <Input placeholder="Please fill in the address" /> 
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User
