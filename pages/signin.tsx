import Header from "@/components/Header/Header";
import React, { useState } from "react";
import styles from "@/pages/styles/signin.module.css";
import { Form, Input, Button, notification } from "antd";
import { InfoOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import UID_Icon from '@/public/images/Education.svg'
import UFirstname_Icon from '@/public/images/User.svg'
import ULasttname_Icon from '@/public/images/Family.svg'
import Username_Icon from '@/public/images/User Scanning.svg'
import Password_Icon from '@/public/images/Fingerprint Scanning.svg'
import UEmail_Icon from '@/public/images/Message.svg'
import USSN_Icon from '@/public/images/Face ID.svg'
import UPhoneNumber_Icon from '@/public/images/Call.svg'


const SignIn = () => {

  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const reqBody = {
      UID: values.UID,
      UFirstname: values.UFirstname,
      ULastname: values.ULastname,
      Username: values.Username,
      Password: values.Password,
      UEmail: values.UEmail,
      URole: "user",
      USSN: values.USSN,
      UPhoneNumber: values.UPhoneNumber,
    }

    try {
      const response = await axios.post(`/api/auth/signin`, reqBody);

      if (response.status == 400) {
        notification.error({
          message: "Error",
          description: "Make sure to compelete all the fields"
        })
      } else if (response.status == 403) {
        console.log(response);

      } else if (response.status == 201) {
        notification.success({
          message: "Welcome",
          description: "Welcome to Our Family"
        })
        setTimeout(() => {
          router.push(`/`)
        }, 2000)

      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Contact the Suport Team"
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
            name="UID"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا شماره دانشجویی خود را وارد نمایید!' },
            {
              validator: (rule, value) => {
                const isValidUID = /^\d{14}$/.test(value);
                if (!isValidUID) {
                  return Promise.reject('شماره دانشجویی باید 14 رقمی باشد و تنها شامل اعداد باشد.');
                }
                return Promise.resolve();
              },
            },
            ]}

          >
            <Input prefix={<Image src={UID_Icon} alt="UID Icon" className="site-form-item-icon" />} placeholder="شماره دانشجویی"
              size="large" />
          </Form.Item>

          <Form.Item
            name="UFirstname"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا نام خود را وارد کنید!' }]}
          >
            <Input prefix={<Image src={UFirstname_Icon} alt="UFirstname Icon" className="site-form-item-icon" />} placeholder="نام"
              size="large" />
          </Form.Item>

          <Form.Item
            name="ULastname"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا نام خانوادگی خود را وارد کنید!' }]}
          >
            <Input prefix={<Image src={ULasttname_Icon} alt="ULasttname Icon" className="site-form-item-icon" />} placeholder="نام خانوادگی"
              size="large" />
          </Form.Item>


          <Form.Item
            name="USSN"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا کد ملی خود را وارد نمایید!' },
            {
              validator: (rule, value) => {
                const isValidUSSN = /^\d{10}$/.test(value);
                if (!isValidUSSN) {
                  return Promise.reject('کد ملی باید شامل اعداد و تنها 10 رقم باشد');
                }
                return Promise.resolve();
              },
            },]}
          >
            <Input prefix={<Image src={USSN_Icon} alt="USSN Icon" className="site-form-item-icon" />} placeholder="کد ملی"
              size="large" />
          </Form.Item>

          <Form.Item
            name="UEmail"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: 'لطفا ایمیل خود را وارد نمایید!'
              },
              {
                type: 'email',
                message: 'لطفا یک ایمیل معتبر وارد نمایید.',
              },
            ]}
          >
            <Input
              prefix={<Image src={UEmail_Icon} alt="UEmail Icon" className="site-form-item-icon" />}
              placeholder="ایمیل"
              size="large"
            />
          </Form.Item>


          <Form.Item
            name="UPhoneNumber"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: 'لطفا شماره تلفن خود را وارد نمایید!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const phoneNumberPattern = /^(?:\+98|0)[0-9]{10}$/;

                  if (!value || phoneNumberPattern.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('لطفا یک شماره تلفن معتبر وارد نمایید.');
                },
              }),
            ]}
          >
            <Input
              prefix={<Image src={UPhoneNumber_Icon} alt="UPhoneNumber Icon" className="site-form-item-icon" />}
              placeholder="شماره تلفن"
              size="large"
            />
          </Form.Item>


          <Form.Item
            name="Username"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا نام کاربری خود را وارد نمایید!' }]}
          >
            <Input prefix={<Image src={Username_Icon} alt="Username Icon" className="site-form-item-icon" />} placeholder="نام کاربری"
              size="large" />
          </Form.Item>


          <Form.Item
            name="Password"
            className={styles.form_item}
            validateTrigger="onBlur"
            rules={[{ required: true, message: 'لطفا رمز ورود خود را وارد نمایید!' }]}
          >
            <Input
              prefix={<Image src={Password_Icon} alt="password Icon" className="site-form-item-icon" />}
              type="password"
              placeholder="رمز ورود"
              size="large"
            />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
          >
            <Link href="/">حساب دارید؟ وارد شوید</Link>
          </Form.Item>


          <Form.Item shouldUpdate className={styles.form_item}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.form_btn}
            >
              ثبت نام
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignIn;
