import { useState } from 'react';
import { Menu, Layout, MenuProps } from 'antd';
import sliderLogo from '../../Assets/Images/mrvlogo.svg';
import { useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import * as Icon from 'react-bootstrap-icons';
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ClipboardMinus, Coin, GraphUpArrow, Headset, Layers } from 'react-bootstrap-icons';
import { LayoutSiderProps } from '../../Definitions/props/layout.sider.definitions';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { Role } from '../../Enums/role.enum';
import { GHGInventoryManipulate } from '../../Enums/user.enum';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LayoutSider = (props: LayoutSiderProps) => {
  const { selectedKey } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { userInfoState } = useUserContext();
  const { t } = useTranslation(['nav']);

  const items: MenuItem[] = [
    getItem(t('nav:dashboard'), 'dashboard', <DashboardOutlined />),
    getItem(t('nav:actions'), 'actions', <Icon.Clipboard2Data />),
    getItem(t('nav:programmes'), 'programmes', <AppstoreOutlined />),
    getItem(t('nav:projects'), 'projects', <Layers />),
    getItem(t('nav:activities'), 'activities', <GraphUpArrow />),
    getItem(t('nav:support'), 'support', <Coin />),
  ];

  if (userInfoState?.ghgInventoryPermission === GHGInventoryManipulate.CAN) {
    items.push(getItem(t('nav:ghgInventory'), 'emissions', <CloudDownloadOutlined />));
  }

  items.push(getItem(t('nav:reporting'), 'reportings', <ClipboardMinus />));
  items.push(getItem(t('nav:faq'), 'faqs', <Headset />));

  if (userInfoState?.userRole === Role.Root || userInfoState?.userRole === Role.Admin) {
    items.push(getItem(t('nav:users'), 'userManagement/viewAll', <UserOutlined />));
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate('/' + e.key);
  };

  return (
    <Sider
      width={240}
      className="layout-sider-container"
      breakpoint={collapsed ? undefined : 'lg'}
      collapsed={collapsed}
    >
      <div className="layout-sider-div-container">
        <div
          className="layout-sider-heading-container"
          onClick={() => navigate('/dashboard', { replace: true })}
        >
          <div className="logo">
            <img src={sliderLogo} alt="slider-logo" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ display: 'flex' }}>
                <div className="title">{collapsed ? '' : 'TRANSPARENCY'}</div>
                <div className="title-sub">{collapsed ? '' : 'SYSTEM'}</div>
              </div>
              <div className="country-name">{process.env.REACT_APP_COUNTRY_NAME || 'CountryX'}</div>
            </div>
          )}
        </div>
        <div className="layout-sider-menu-container">
          <Menu
            theme="light"
            selectedKeys={[selectedKey ? selectedKey : 'dashboard']}
            mode="inline"
            onClick={onClick}
            items={items}
          />
        </div>
      </div>
      <div
        className="toggle-nav-btn"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <Icon.ArrowRight /> : <Icon.ArrowLeft />}
      </div>
    </Sider>
  );
};

export default LayoutSider;
