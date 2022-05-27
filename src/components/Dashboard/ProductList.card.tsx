import { getOrderByParams, getShortageItems } from "@SRC/data/api.service";
import { Carousel, Space } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setEnvironmentData } from "worker_threads";

interface IShortageItem {
  name: string;
  currentInStock: number;
}

const ProductListCard = () => {
  const [data, setData] = useState<Array<IShortageItem>>([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    getShortageItems(setData);
  }, []);

  return (
    <>
      <Carousel autoplay dotPosition="left" dots={false} effect="fade">
        {data.map((item, index) => {
          return (
            <>
              <SingleItem key={item.name}>
                <Space direction="vertical">
                  <h4>{item.name}</h4>
                  <p>
                    Currently only <strong>{item.currentInStock}</strong> left!!
                  </p>
                </Space>
              </SingleItem>
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default ProductListCard;

const SingleItem = styled.div`
  height: 100px;
  text-align: center;
`;
