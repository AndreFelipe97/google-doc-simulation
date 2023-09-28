import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { api } from "@/lib/axios";

export function ModalForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      await api.post("/files", values);
      setIsModalOpen(false);
    } catch (e) {
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
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Novo arquivo
      </Button>
      <Modal
        title="Novo arquivo"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
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
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
