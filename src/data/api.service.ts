import Request from "@DATA/api.controller";
import envSwitch from "@SRC/utils/ENVCONFIG";
import { refineQueryString, deduplicateArray, timeStamp } from "@SRC/utils/utilFuncs";
import qs from "query-string";
import { store } from "./dataStore/store.redux";
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo } from "@DATA/dataSlices/order.slice";
import { IUser, IProduct, ILogisticSearchParams, ELogisticStatus, IlogisticInfo, IOrderProduct, IOrderStatusCombined } from "src/utils/interfaces";
import Notification from "@SRC/utils/commomComponents/Notification";
import { FormInstance } from "antd";
// import debounce from "lodash/debounce";

const dispatch = store.dispatch;

const debounce = (callback: Function, timer = 1000): Function => {
  let delay: any;
  return function (this: any, ...args: any) {
    if (delay) {
      clearTimeout(delay);
    }
    delay = setTimeout(() => {
      callback(...args);
    }, timer);
  };
};

const env = envSwitch("dev");

export const generateOrder = async (payload: object) => {
  await Request.post(`${env.dbUri}/orders`, payload, {}, "order");
};

export const getOrderByParams = (searchParams: Partial<IOrderStatusCombined>, setData: Function, setLoadingStatus: Function, formInstance?: FormInstance) => {
  // debugger;
  // init the search, loading starts
  setLoadingStatus(true);

  const tempFunc = async () => {
    await Request.get(`${env.dbUri}/orders?${qs.stringify(refineQueryString(searchParams))}`)
      .then((response: any) => {
        setData(response);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  };
  tempFunc();
};

export const getOrdersById = async (searchParams: { orderId: string }) => {
  return await Request.get(`${env.dbUri}/orders?${qs.stringify(refineQueryString(searchParams))}`);
};

/**
 * beware that this func is specifically designed for Json-server, if the backend is deployed, this should change.
 */
export const updateOrderForPayment = async (
  orderId: number,
  paymentDetail: { method: "cash" | "debitCard" | "creditCard" | "paypal" | "3rdParty"; amount: number; referenceCodes: string; description: string }
) => {
  Request.put(`${env.dbUri}/orders/${orderId}`, paymentDetail, "Payment");
};

/**
 * beware that this func is specifically designed for Json-server, if the backend is deployed, this should change.
 */
export const updateOrderForFabrication = async (
  orderId: number,
  fabricationStatus: "pending" | "machineProcessing" | "machineProcessFinished" | "powderCoating" | "powderCoatingFinished" | "waitingForInstallation" | "installing" | "ready"
) => {
  Request.put(`${env.dbUri}/orders/${orderId}`, fabricationStatus, "Fabrication Status");
};

export const updateOrderForLogistic = async (orderId: number, logisticStatus: ELogisticStatus) => {
  Request.put(`${env.dbUri}/orders/${orderId}`, logisticStatus, "Logistic Status");
};

export const updateOrderForLogisticInfo = async (orderId: number, logisticInfo: IlogisticInfo) => {
  Request.put(`${env.dbUri}/orders/${orderId}`, logisticInfo, "LogisticInfo");
};

export const getProductBySku = async (searchParams: { sku: string }) => {
  return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(searchParams))}`).then((response: any) => {
    console.log(response);
  });
};

export const getClientsByParams = (
  params: { email: string } | { mobile: number },
  loadingStatus: any,
  setLoadingStatus: any,
  formInstance: any,
  setUiController: any,
  uiController: { userInfo: any; userCreateOrEditSwitch: any; shippingInfo: any }
) => {
  setLoadingStatus({
    ...loadingStatus,
    userInfo: true,
  });
  const tempFunc = async () => {
    await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(params))}`)
      .then((response: any) => {
        if (response.length > 0) {
          setUiController({
            ...uiController,
            userCreateOrEditSwitch: true,
          });

          const { name, id, email, mobile, vip, address, postcode } = response[0];
          formInstance.setFieldsValue({
            client: {
              name: name,
              email: email,
              mobile: mobile,
              vip: vip,
              address: address,
              postcode: postcode,
              id: id,
            },
          });
        } else {
          formInstance.setFieldsValue({
            client: {
              name: null,
              email: null,
              mobile: null,
              vip: null,
              address: null,
              postcode: null,
              id: null,
            },
          });
        }
      })
      .finally(() => {
        // setUiController({
        //   ...uiController,
        //   userCreateOrEditSwitch: false,
        // })
        setLoadingStatus({
          ...loadingStatus,
          userInfo: false,
        });
      });
  };

  // const debouncedTempFunc = debounce(tempFunc, 3000);
  tempFunc();
};

/**
 * Update exiting user Info or Create new user
 *
 */
export const manipulateUserInfo = async (payload: IUser, funcSwitch: "create" | "update") => {
  let tempPayload;
  if (funcSwitch === "update") {
    tempPayload = { ...payload, updatedAt: timeStamp() };
    await Request.put(`${env.dbUri}/clients/${tempPayload.id}}`, payload, `User Info${payload.name}`);
  }
  if (funcSwitch === "create") {
    tempPayload = { ...payload, createdAt: timeStamp() };
    await Request.post(`${env.dbUri}/clients`, payload, {}, `user: ${payload.name}`);
  } else return Notification({ type: "error", message: "User Component Error" });
};

export const searchProductBySku = async (
  sku: string,
  setLoadingStatus: any,
  loadingStatus: {
    userInfo: boolean;
    shippingInfo: boolean;
    productSearch: boolean;
  },
  formInstance: any,
  columnIndex: number
) => {
  setLoadingStatus({
    ...loadingStatus,
    productSearch: true,
  });
  // console.log(sku)

  await Request.get(`${env.dbUri}/products?sku=${sku}`)

    .then((response: any) => {
      // debugger;
      let currentFormValue = formInstance.getFieldValue("products"); // accquire entire list of items
      if (response.length > 0) {
        // console.log(response[0])

        const { name, id, size, price, powdercoatingPrice, installationPrice, currentInStock } = response[0]; // accquire the response item
        const currentColumn = {
          id: id,
          name: name,
          size: size,
          price: price,
          pcPrice: powdercoatingPrice,
          installPrice: installationPrice,
          currentInStock: currentInStock,
        };
        const changedFormValue = currentFormValue.map((item: any, index: number) => {
          if (index === columnIndex) {
            item.name = currentColumn.name;
            item.id = currentColumn.id;
            item.size = currentColumn.size;
            item.price = currentColumn.price;
            item.pcPrice = currentColumn.pcPrice;
            item.installPrice = currentColumn.installPrice;
            item.currentInStock = currentColumn.currentInStock;
            return item;
          } else return item;
        });

        formInstance.setFieldsValue({ products: changedFormValue });
      } else {
        return null;
      }
    })
    .finally(() => {
      setTimeout(() => {
        setLoadingStatus({
          ...loadingStatus,
          productSearch: false,
        });
      }, 1000);
    });
};

/**
 * to be called in the Addpayment component
 * @param product
 */
export const deductProduct = async (product: IOrderProduct) => {
  const payload = {
    ...product,
    currentInStock: product.currentInStock - 1,
  };

  await Request.put(`${env.dbUri}/products/${product.id}`, payload, `${product.name}`);
};

export const AddToWatchingList = async (orderNumber: number, checked: boolean) => {
  await Request.patch(`${env.dbUri}/orders/${orderNumber}`, { checked: !checked }, `OrderNumber: ${orderNumber}`);
};

// only works for Jons server: the sytax currentInStock_gte=1&currentInStock_lte=5 only works for json server
export const getShortageItems = async (setData: Function) => {
  const searchParams = `${env.dbUri}/products?currentInStock_gte=1&currentInStock_lte=5`;
  await Request.get(searchParams).then((response: any) => {
    setData(response);
  });
};

export const getProductData = async (queryData: { name?: string; sku?: string } = {}) => {
  return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(queryData))}`);
};

export const putProductData = async (url: string, payload: object) => {
  return await Request.put(`${env.dbUri}/products/${url}`, payload, "Product");
};

export const createNewProduct = (payload: object) => {
  return Request.post(`${env.dbUri}/products`, payload, {}, "Product");
};

export const getProductDataDeposits = async (queryData: { name?: string; sku?: string } = {}) => {
  return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(queryData))}`);
};
