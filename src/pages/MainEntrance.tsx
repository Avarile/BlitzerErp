import React, { ReactInstance, useState, useRef } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Space } from "antd";
import { TabletOutlined, CrownOutlined } from "@ant-design/icons";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Header from "@SRC/components/Header";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUser } from "@SRC/data/dataSlices/auth.slice";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const MainEntrance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentSelection = useRef("dashboard");

  const [uiController, setUiController] = useState({
    collapsed: false,
    loading: false,
  });

  const logout = () => {
    window.sessionStorage.clear();
    dispatch(
      setUser({
        username: "",
        email: "",
        password: "",
        token: "",
      })
    );
    setUiController({
      ...uiController,
      loading: true,
    });
    setTimeout(() => {
      setUiController({
        ...uiController,
        loading: false,
      });

      navigate("/login");
    }, 3000);
  };

  const toggle = () => {
    setUiController({
      ...uiController,
      collapsed: !uiController.collapsed,
    });
  };

  return (
    <CustomLayout style={{ minHeight: "100vh", backgroundColor: "dark" }}>
      <Sider width={250} trigger={null} collapsible collapsed={uiController.collapsed} theme="light">
        <Space className="logo" style={{ padding: "0,1rem,0,1rem" }}>
          {uiController.collapsed ? <h3>Blitzer</h3> : <h3>Avarile' Blitzer ERP SYSTEM</h3>}
        </Space>
        <Menu theme="light" mode="inline">
          <Menu.Item
            key="dashboard"
            icon={StyledCrownWrapper(CrownOutlined, { color: "light" })}
            onClick={() => {
              currentSelection.current = "dashboard";
            }}>
            <Link
              to="/mainentrance/dashboardindex"
              style={{ textDecoration: "none" }}
              onClick={() => {
                currentSelection.current = "dashboard";
              }}>
              DashBoard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="ordermanagement"
            icon={StyledCrownWrapper(CrownOutlined, { color: "light" })}
            onClick={() => {
              currentSelection.current = "ordermanagement";
            }}>
            <Link
              to="/mainentrance/ordermanagement"
              style={{ textDecoration: "none" }}
              onClick={() => {
                currentSelection.current = "ordermanagment";
                console.log(currentSelection.current);
              }}>
              Order Managment
            </Link>
          </Menu.Item>
          <SubMenu key="inventory" icon={StyledCrownWrapper(CrownOutlined, { color: "dark" })} title="Inventory Managment">
            <Menu.Item
              key="2"
              icon={<TabletOutlined />}
              onClick={() => {
                currentSelection.current = "inventory";
              }}>
              <Link to="/mainentrance/warehousing/instock" style={{ textDecoration: "none" }}>
                Invertory
              </Link>
            </Menu.Item>
            <Menu.Item
              key="melStock"
              icon={<TabletOutlined />}
              onClick={() => {
                currentSelection.current = "melStock";
              }}>
              <Link to="/mainentrance/warehousing/melstock" style={{ textDecoration: "none" }}>
                Current Stock(Melbourne)
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TabletOutlined />}>
              <Link to="/mainentrance/warehousing/melstock" style={{ textDecoration: "none" }}>
                Current Stock(Brisbane)
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={StyledCrownWrapper(CrownOutlined, { color: "dark" })} title="Fabrication">
            <Menu.Item key="5" icon={<TabletOutlined />}>
              <Link to="/mainentrance/fabrication/index" style={{ textDecoration: "none" }}>
                Fabrication Index
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="6" icon={<TabletOutlined />}>
              <Link to="/mainentrance/fabrication/powdercoating" style={{ textDecoration: "none" }}>
                Powder Coating
              </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TabletOutlined />}>
              <Link to="/mainentrance/fabrication/workshop" style={{ textDecoration: "none" }}>
                WorkShop
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<TabletOutlined />}>
              <Link to="/mainentrance/fabrication/customize" style={{ textDecoration: "none" }}>
                Custom Item
              </Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub3" icon={StyledCrownWrapper(CrownOutlined, { color: "dark" })} title="Logistic">
            <Menu.Item key="9" icon={<TabletOutlined />}>
              <Link to="/mainentrance/logistic/logisticindex" style={{ textDecoration: "none" }}>
                Logistic Index
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="10" icon={<TabletOutlined />}>
              <Link to="/mainentrance/logistic/fastway" style={{ textDecoration: "none" }}>
                Fastway
              </Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<TabletOutlined />}>
              <Link to="/mainentrance/logstic/post" style={{ textDecoration: "none" }}>
                Post
              </Link>
            </Menu.Item>
            <Menu.Item key="12" icon={<TabletOutlined />}>
              <Link to="/mainentrance/logistic/bigpost" style={{ textDecoration: "none" }}>
                Bigpost
              </Link>
            </Menu.Item> */}
          </SubMenu>
          <Menu.Item key="13" icon={StyledCrownWrapper(CrownOutlined, { color: "dark" })}>
            <Link to="/mainentrance/incomingcontainer" style={{ textDecoration: "none" }}>
              Arriving Container
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header logout={logout} toggle={toggle} uiController={uiController} setUiController={setUiController} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px 24px 10px",
            padding: "24px 24px 24px 60px",
            minHeight: 280,
            display: "flex",
          }}>
          <Outlet />
        </Content>
      </Layout>
    </CustomLayout>
  );
};

export default MainEntrance;

const StyledCrownWrapper = (Child: React.ForwardRefExoticComponent<any>, Style: Object) => {
  return <Child style={Style} />;
};

const Crown = StyledCrownWrapper(CrownOutlined, { color: "dark" });

/**
 * pass the css values to the entire project, will not effect the modal (modal is paralled to the rootApp)
 */
const CustomLayout = styled(Layout)`
  /* * {
    margin: 0;
    padding: 0;
  } */
`;
