import { Space, Table as TableAntd, Tag } from 'antd';
import { TableComponent } from './styles';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import Link from 'next/link';

const { Column } = TableAntd;

interface DataType {
  _id: string;
  title: string;
}

export function Table() {
  const [data, setData] = useState<Array<DataType>>([])

  async function getValues() {
    const response = await api.get('/files');
    setData(response.data)
  }

  useEffect(() => { 
    getValues();
  }, []);

  return (
     <TableComponent dataSource={data}>
      <Column title="Titulo" dataIndex="title" key="title" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => <Link key={record._id} href={`/file/edit/${record._id}`}>Visualizar</Link>}
      />
    </TableComponent>
  )
}