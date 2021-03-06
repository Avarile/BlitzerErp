import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, FormInstance, Select, Typography } from "antd";
import Request from "@DATA/api.controller";
import qs from "query-string";
import { refineQueryString, QueryStringType } from "@SRC/utils/utilFuncs";
import useDebounce from "@SRC/Hooks/useDebounce";
import { productTypes, details, subType } from "@SRC/utils/productTypes";
import { getProductData, putProductData } from "@SRC/data/api.service";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const WarehousingAbolishForm = () => {
  // useRef example usage as  refering an instance of a component
  // 1st step: create a ref
  const ref = useRef<FormInstance<any> | null>();

  const onFinish = (values: any) => {};

  const [isloading, setIsloading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [searchParams, setSearchParams] = useState<QueryStringType>({
    name: "",
    sku: "",
  });

  const debouncedSearchParams = useDebounce(searchParams, 3000);

  // const getProductData = async (queryData: { name?: string; sku?: string } = {}) => {
  //   return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(queryData))}`)
  // }

  // const putProductData = async (url: string, payload: object) => {
  //   return await Request.put(`${env.dbUri}/products/${url}`, payload, "Product")
  // }
  // 生命周期hook执行，切记不是事件执行，依赖为啥叫依赖而不是监听源头，不是事件驱动的。
  useEffect(() => {
    // load the producData and productTypes on the first render and only load once

    getProductData().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <Form
      initialValues={{}}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{ flex: 1 }} // flex: 1 的作用
      //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
      ref={(formInstance: FormInstance<any> | null) => {
        ref.current = formInstance;
      }}>
      <Form.Item label="Search for the Product" style={{ marginBottom: 0 }}>
        <Form.Item
          name={["product", "productName"]}
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            paddingRight: "5px",
          }}>
          <Input
            placeholder="Please Input the product name"
            onChange={() => {
              let currentFormValue = ref.current?.getFieldValue("product");
              let queryData = {
                name: currentFormValue.productName,
              };
              getProductData(queryData).then((response: any) => {
                const { type, size, price, powdercoatingprice, currentInStock, sku, updateLog, spec, desc, installationprice } = response?.[0] || {};
                // set FormFields
                ref.current?.setFieldsValue({
                  product: {
                    ...currentFormValue,
                    productType: type,
                    productSku: sku,
                    productUpdateLog: updateLog,
                    productQuantityAdd: 0,
                    productQuantityInstock: currentInStock,
                    productSpecification: spec,
                    productDescription: desc,
                    productInstallationPrice: installationprice,
                    productPowderCoatingPrice: powdercoatingprice,
                    productPrice: price,
                    productSize: size,
                  },
                });
              });
            }}
          />
        </Form.Item>

        <Form.Item name={["product", "productSku"]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
          <Select
            placeholder="Select Product from list"
            onChange={() => {
              // 当select数据变化时，获得form表单的product的数据
              let currentFormValue = ref.current?.getFieldValue("product");
              let queryData = {
                sku: currentFormValue.productSku,
              };
              // 根据选择项的数据，进行请求
              getProductData(queryData)
                .then((response: any) => {
                  console.log(response);
                  const { type, name, size, price, powdercoatingprice, currentInStock, updateLog, spec, desc, installationprice } = response?.[0] || {};
                  // 设置表单数据
                  // setFieldsValue是底层包装了state，确保了表单刷新
                  // 但是，setFieldsValue并不会引发当前组件的刷新
                  // 表单是子组件
                  // 子组件刷新不会引发父组件刷新
                  // 当前组件是父组件，表单是子组件
                  // setFieldsValue触发了表单的数显，即子组件的刷新，确保了表单项目显示正确
                  // 当前组件不会刷新，也就不会出发useEffect
                  ref.current?.setFieldsValue({
                    product: {
                      ...currentFormValue,
                      productType: type,
                      productName: name,
                      productUpdateLog: updateLog,
                      productQuantityAdd: 0,
                      productQuantityInstock: currentInStock,
                      productSpecification: spec,
                      productDescription: desc,
                      productInstallationPrice: installationprice,
                      productPowderCoatingPrice: powdercoatingprice,
                      productPrice: price,
                      productSize: size,
                    },
                  });
                })
                .catch((error: any) => {
                  throw new Error(error);
                });
            }}>
            {products.map((product: any) => {
              return (
                <Select.Option value={product.sku} key={product.id}>
                  {product.sku}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={["product", "productType"]}
        label="Type"
        rules={[
          {
            required: false,
            message: "must provide product Type",
          },
        ]}>
        <Select
          placeholder="Please select a Type"
          onChange={() => {
            // console.log(ref.current?.getFieldValue("product").productType)
          }}>
          {productTypes.map((type: { id: number; name: string }) => {
            return (
              <Select.Option key={type.id} value={type.name}>
                {type.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["product", "productSubType"]}
        label="SubType"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="Please select SubType of the product">
          {subType.map((sub: any) => {
            return (
              <Select.Option key={sub.id} value={sub.name}>
                {sub.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["product", "productDetail"]}
        label="Detail"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="Please select the detail definition">
          {details.map((detail) => {
            return (
              <Select.Option key={detail.id} value={detail.name}>
                {detail.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["product", "productSku"]}
        label="SKU"
        rules={[
          {
            required: false,
            message: "must provide products SKU",
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productQuantityEff"]}
        label="Quantity Effected"
        rules={[
          {
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productQuantityInstock"]}
        label="Quantity inStock"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99999,
          },
        ]}>
        <InputNumber disabled={true} />
      </Form.Item>
      <Form.Item
        name={["product", "productPrice"]}
        label="Product Price"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99999,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPowderCoatingPrice"]}
        label="Powder Coating Price"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99999,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productInstallationPrice"]}
        label="Installation Price"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99999,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productSize"]}
        label="Size"
        rules={[
          {
            required: false,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item name={["product", "productDescription"]} label="Description">
        <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item name={["product", "productSpecification"]} label="Specification">
        <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item name={["product", "productUpdateLog"]} label="Update Log">
        <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          // htmlType="submit"
          block
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            setIsloading(true);
            setTimeout(() => {
              let { productQuantityAdd, productDescription } = ref.current?.getFieldValue("product");
              const currentProduct = products[0];
              const targetId = currentProduct.id;
              const payloadProduct = {
                ...currentProduct,
                currentInStock: currentProduct.currentInStock + productQuantityAdd,
                updateLog: productDescription,
              };
              putProductData(targetId, payloadProduct).then((response) => {
                console.log(`product ${response} is create.`);
              });

              setIsloading(false);
              ref.current?.resetFields();
            }, 2000);
          }}>
          Submit
        </Button>
        <Button
          onClick={() => {
            ref.current?.resetFields();
          }}
          block>
          Reset Form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default WarehousingAbolishForm;
