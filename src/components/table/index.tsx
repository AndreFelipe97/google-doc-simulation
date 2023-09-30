import { Space, Table as TableAntd, Tag } from "antd";
import { fetcher } from "@/lib/swr";
import Link from "next/link";
import useSWR from "swr";

const { Column } = TableAntd;

interface DataType {
  _id: string;
  title: string;
}

export function Table() {
  const { data } = useSWR(`/api/files/`, fetcher);

  return (
    <TableAntd dataSource={data} pagination={false}>
      <Column title="Titulo do arquivo" dataIndex="title" key="title" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <Link key={record._id} href={`/file/edit/${record._id}`}>
              Editar
            </Link>
            <Link key={record._id} href={`/file/edit/${record._id}?view=true`}>
              Visualizar
            </Link>
          </Space>
        )}
      />
    </TableAntd>
  );
}
