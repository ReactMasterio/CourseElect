import Header from "@/components/Header/Header";
import React, { useState } from "react";
import styles from "@/pages/styles/index.module.css";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';


const onFinish = (values: any) => {
  console.log("Success:", values);
};

const login = () => {

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);


  return (
    <>
      <div className={styles.bg}>
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish} className={styles.form_bg}>
          <Form.Item
            name="username"
            className={styles.form_item}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
              size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            className={styles.form_item}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item shouldUpdate className={styles.form_item}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className={styles.form_btn}
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                ورود
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default login;
