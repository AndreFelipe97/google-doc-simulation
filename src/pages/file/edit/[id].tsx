import { useRouter } from "next/router";
import { Button, Form, Input, Row, Spin } from "antd";
const { TextArea } = Input;
import { Roboto } from "next/font/google";

import { fetcher } from "@/lib/swr";
import { io, type Socket } from "socket.io-client";

import { ButtonContainer, Container } from "@/styles/edit.styles";
import useSWR from "swr";
import Link from "next/link";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/socketCustomTypes";
import { useContext, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { BreadcrumbsContext } from "@/contexts/breadcrumbs";
import { TitlePageContext } from "@/contexts/PageTitle";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export default function FileEdit() {
  const router = useRouter();
  const { id, view } = router.query;
  const { data } = useSWR(`http://localhost:3000/api/files/${id}`, fetcher);
  const [message, setMessage] = useState("");

  const { setBreadcrumbsType } = useContext(BreadcrumbsContext);
  const { setTitlePage } = useContext(TitlePageContext);

  useEffect(() => {
    setBreadcrumbsType(['Lista de arquivos', view ? 'Visualizar' : 'Editar'])
    if (!socket) {
      void fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("sendNotif", (msg) => {
        setMessage(msg);
      });
      socket.on("userServerConnection", () => {
        console.log("a user connected (client)");
      });

      socket.on("userServerDisconnection", (socketid: string) => {
        console.log(socketid);
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  useEffect(() => {
    if (socket && id) {
      socket.emit(
        "joinFile",
        String(id),
        String(data?.content ? data.content : "")
      );
    }
  }, [id, data]);


  useEffect(() => {
    setTitlePage(data.title);
  }, [data.title, setTitlePage]);

  return (
    <>
      {!data?.content ? (
        <Row justify="center" align="middle">
          <Spin />
        </Row>
      ) : (
        <>
          <TextArea
            id="content"
            rows={30}
            value={message}
            onKeyUp={async () => {
              try {
                await api.put(`/files/${id}`, {
                  ...data,
                  content: message,
                });
                // router.push("/");
              } catch (e) {
                console.log(e);
              }
            }}
            onChange={(event) => {
              setMessage(event.target.value);
              socket?.emit("sendMsg", event.target.value, String(id));
            }}
            disabled={view === "true" ? true : false}
          />
          {view !== "true" && (
            <Row justify='end' style={{
              marginTop: 10
            }}>
              <Link key="back" href="/">
                <Button>Voltar</Button>
              </Link>
            </Row>
          )}
        </>
      )}
    </>
  );
}
