import { useRouter } from "next/router";
import { Input, Spin } from "antd";
const { TextArea } = Input;
import { Roboto } from "next/font/google";

import { fetcher } from "@/lib/swr";

import { Container } from "@/styles/edit.styles";
import useSWR from "swr";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

interface DataType {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
}

export default function FileEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`http://localhost:3000/api/files/${id}`, fetcher);

  if (!data?.content) {
    return <Spin />;
  }

  return (
    <Container className={`${roboto.className}`}>
      <h1>Edição do arquivo {data?.title}</h1>
      <TextArea rows={4} cols={5} defaultValue={data?.content} maxLength={6} />
    </Container>
  );
}
