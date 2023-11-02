import Header from "@/components/Header/Header";
import React, { useState } from "react";
import styles from "@/pages/styles/index.module.css";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";


const login = () => {

  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const reqBody = {
      username: values.username,
      password: values.password
    }

    try {
      const response = await axios.post(`/api/auth/login`, reqBody);

      if (response.status === 400) {
        console.log(response);
        notification.error({
          message: `Invalid Context`,
          description:
            'Please make sure you fill all the fields',
          duration: 0,
        })
      } else if (response.status === 404) {
        console.log(response);
        notification.error({
          message: `User Not Found!`,
          description:
            'User with this Username is not in our Database! Please SignIn First.',
          duration: 0,
        })
      } else if (response.status === 403) {
        console.log(response);
        notification.error({
          message: `Invalid username or password.`,
          description:
            'Please Check the Username or Password',
          duration: 0,
        })
      } else if (response.status === 200) {
        router.push('/home');
      }

    } catch (error) {
      notification.error({
        message: `Somthing Went Wrong.`,
        description:
          'Please Contact the Support Team',
        duration: 0,
      })
    }


  };


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

          <Form.Item
            name="password"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا رمز ورود خود را وارد نمایید!' }]}
          >
            <Link href="/signin">حساب ندارید؟ ساختن حساب جدید</Link>
          </Form.Item>


          <Form.Item shouldUpdate className={styles.form_item}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
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
