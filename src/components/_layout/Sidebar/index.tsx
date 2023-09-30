import { BreadcrumbsContext } from "@/contexts/breadcrumbs";
import { FormOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu } from 'antd';
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const { Sider } = Layout;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const { setBreadcrumbsType } = useContext(BreadcrumbsContext)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[
        {
          key: '1',
          icon: <UnorderedListOutlined />,
          label: 'Lista de arquivos',
          onClick: () => {
            setBreadcrumbsType(['Lista de arquivos'])
            router.push('/')
          }
        },
        {
          key: '2',
          icon: <FormOutlined />,
          label: 'Cadastrar arquivo',
          onClick: () => {
            setBreadcrumbsType(['Cadastrar arquivo'])
            router.push('/file/add')
          }
        },
      ]} />
    </Sider>
  )
}