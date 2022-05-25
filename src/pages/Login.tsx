import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import Storage from "@SRC/data/session.controller";
import Notification from "@SRC/utils/commomComponents/Notification";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate(); // 获取路由
  const [loginSuspense, setLoginSuspense] = useState(false); // 初始化登录等待
  // debugger;
  const fakeLoginApi = (values: { username: string; password: string }) => {
    // 暂时用来顶替后端严证的API
    setLoginSuspense(true);
    setTimeout(() => {
      // debugger;
      if (values.username === "Avarile" && values.password === "000000") {
        Storage.setCacheData("USER", values);
        Notification({
          type: "success",
          message: "Login Success!",
          messageTarget: "",
        });
        navigate("/mainentrance/dashboardindex"); // 通过验证之后 的路由跳转
        setLoginSuspense(false);
      } else {
        setLoginSuspense(false); // 验证失败 弹出错误
        Notification({
          type: "error",
          message: "Wrong username or password!",
          messageTarget: "",
        });
      }
    }, 3000);
  };
  const onFinish = (values: any) => {
    // 提交页面内容 触发器
    fakeLoginApi(values); // 触发假的验证功能
  };

  const onFinishFailed = (errorInfo: any) => {
    Notification({
      type: "error",
      message: "Wrong username or password!",
      messageTarget: "",
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccccc",
      }}>
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          minWidth: "20rem",
          maxWidth: "60rem",
        }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            // {
            //   min: 8,
            //   message: "password must be at least 8 digit.",
            // },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loginSuspense}
            loading={loginSuspense}
            // onClick={() => {
            //   setLoginSuspense(true)
            //   setTimeout(() => {
            //     setLoginSuspense(false)
            //   }, 3000)
            // }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
