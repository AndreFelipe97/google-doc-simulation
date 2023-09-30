import { TitlePageContext } from "@/contexts/PageTitle";
import { NotificationContext } from "@/contexts/notification";
import { api } from "@/lib/axios";
import { Button, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Add() {
  const router = useRouter();

  const { setNotificationType } = useContext(NotificationContext);
  const { setTitlePage } = useContext(TitlePageContext);

  useEffect(() => {
    setTitlePage('');
  }, []);

  const onFinish = async (values: any) => {
    try {
      await api.post("/files", values);
      setNotificationType('success');
      router.push('/')
    } catch (e) {
      setNotificationType('error');
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    title: string;
    content: string;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Titulo"
        name="title"
        rules={[
          { required: true, message: "Digite um titulo para o arquivo" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Conteudo"
        name="content"
        rules={[
          { required: true, message: "Por favor digite um conteudo!" },
        ]}
      >
        <Input.TextArea rows={24} />
      </Form.Item>

      <Row justify="end">
        <Form.Item wrapperCol={{ flex: 'auto' }}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}