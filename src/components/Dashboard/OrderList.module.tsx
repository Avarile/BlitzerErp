import { Badge, Table } from "antd";
import React, { useEffect, useState } from "react";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";
import { fabricationStatusIndicator, logisticStatusIndicator, orderStatusIndicator } from "@SRC/utils/utilFuncs";
import { getOrderByParams } from "@SRC/data/api.service";

const columns = [
  { title: "Order Number", dataIndex: "id", key: "orderNumber" },
  { title: "Client", dataIndex: "clientName", key: "clientName" },
  { title: "OrderAmount", dataIndex: "pricetotalAmount", key: "orderAmount" },
  { title: "Amount payed", dataIndex: "orderPayed", key: "amountPayed" },
  {
    title: "Logistic Status",
    dataIndex: "logisticStatus",
    key: "logisticStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={logisticStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
  {
    title: "Payment Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={orderStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
  {
    title: "Fabrication Status",
    dataIndex: "fabricationStatus",
    key: "fabricationStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={fabricationStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
];

function onChange(pagination: any, filters: any, sorter: any, extra: any) {
  console.log("params", pagination, filters, sorter, extra);
}

const DashboardOrderList = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const customSearchParams = {
    checked: true,
  };

  useEffect(() => {
    getOrderByParams(customSearchParams, setData, setLoadingStatus);
  }, []);

  return DashboardCard({
    title: "Watching Order List",
    style: { flexGrow: 1, marginBottom: "1rem" },
    Content: (
      <>
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
      </>
    ),
  });
};

export default DashboardOrderList;
