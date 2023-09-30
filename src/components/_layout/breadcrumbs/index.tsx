import BreadcrumbsProvider, { BreadcrumbsContext } from "@/contexts/breadcrumbs";
import { Breadcrumb } from "antd";
import { useContext } from "react";

export function BreadcrumbsLayout() {
  const { items } = useContext(BreadcrumbsContext)
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {
        items.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
      }
    </Breadcrumb>
  );
}