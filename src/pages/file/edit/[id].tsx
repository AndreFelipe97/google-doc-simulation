import { useRouter } from "next/router";
import { Button, Input, Spin } from "antd";
const { TextArea } = Input;
import { Roboto } from "next/font/google";

import { fetcher } from "@/lib/swr";

import { Container } from "@/styles/edit.styles";
import useSWR from "swr";
import Link from "next/link";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

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
      <TextArea rows={30} cols={5} defaultValue={data?.content} />
      <Link key="back" href="/">
        <Button>Voltar</Button>
      </Link>
    </Container>
  );
}
