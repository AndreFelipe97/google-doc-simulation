import { Space, Table as TableAntd, Tag } from "antd";
import { TableComponent } from "./styles";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/swr";
import Link from "next/link";
import useSWR from "swr";

const { Column } = TableAntd;

interface DataType {
  _id: string;
  title: string;
}

export function Table() {
  const { data } = useSWR(`http://localhost:3000/api/files/`, fetcher);

  return (
    <TableComponent dataSource={data}>
      <Column title="Titulo" dataIndex="title" key="title" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Link key={record._id} href={`/file/edit/${record._id}`}>
            Visualizar
          </Link>
        )}
      />
    </TableComponent>
  );
}
