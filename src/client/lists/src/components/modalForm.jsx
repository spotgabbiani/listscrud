import React from 'react';
import { Modal, Form, Input } from 'antd';

const NewListForm = ({ visible, onCreate, onCancel, formTitle, okText }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={formTitle}
      okText={okText}
      destroyOnClose={true}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: '',
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewListForm;