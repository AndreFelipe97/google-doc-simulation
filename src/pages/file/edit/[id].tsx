import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from 'antd';
const { TextArea } = Input;
import { Roboto } from "next/font/google";

import { api } from "@/lib/axios";

import { Container } from "@/styles/edit.styles";

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

interface DataType {
  _id: string;
  title: string;
  slug: string;
  content: string;
	createdAt: Date,
}

export default function FileEdit() {
  const [data, setData] = useState<DataType>({} as DataType)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => { 
    async function getValues() {
      const response = await api.get(`/files/${id}`);
      setData(response.data)
    }
    
    getValues();
  }, []);

  return (
    <Container className={`${roboto.className}`}>
      <h1>Edição do arquivo {data.title}</h1>
      <TextArea rows={4} cols={5} value={data.content} maxLength={6} />
    </Container>
  )
}