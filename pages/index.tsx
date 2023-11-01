import Header from "@/components/Header/Header";
import React, { useState } from "react";
import styles from "@/pages/styles/index.module.css";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';


const onFinish = (values: any) => {
  console.log("Success:", values);
};

const login = (props) => {

  const [form] = Form.useForm();


  return (
    <>
      <div className={styles.bg}>




        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish} className={styles.form_bg}>
          <h2 className={styles.header_title}>
            Course<span className={styles.span}>E</span>lect
          </h2>
          <Form.Item
            name="username"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا نام کاربری خود را وارد نمایید!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="نام کاربری"
              size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا رمز ورود خود را وارد نمایید!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="رمز ورود"
              size="large"
            />
          </Form.Item>
          <Form.Item shouldUpdate className={styles.form_item}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.form_btn}
            >
              ورود
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default login;
