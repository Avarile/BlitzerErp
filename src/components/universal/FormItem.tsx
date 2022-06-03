import React, { ReactNode } from "react";
import { Form, FormInstance, FormProps } from "antd";
import { FormLayout } from "antd/lib/form/Form";

// accept form settings to generate a Form.

interface IFormSetting {
  layout: FormLayout | undefined;
  name: string;
  form: FormInstance;
  validateMessages: Object;
  style: Object;
}

interface IFormItemSetting {
  name: Array<string> | string;
  label: string;
  rules: Array<Object>;
  children: ReactNode;
}

export const FormGenerator = (FormSettings: IFormSetting, FormItems: Array<IFormItemSetting>) => {
  return (
    <Form layout={FormSettings.layout} name={FormSettings.name} form={FormSettings.form} validateMessages={FormSettings.validateMessages} style={FormSettings.style}>
      {FormItems.map((item: IFormItemSetting, index) => {
        return <Form.Item {...item}></Form.Item>;
      })}
    </Form>
  );
};

export const FormItemGenerator = (FormItems: Partial<IFormItemSetting>) => {
  return (
    <Form.Item name={FormItems.name} label={FormItems.label} rules={FormItems.rules}>
      {FormItems.children}
    </Form.Item>
  );
};
