import { FileModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { File } from "@/models/File";
type UpdateTodoBody = Partial<File>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id as string;
  if (req.method === "GET") {
    const todo = await FileModel.findById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404);
    }
  } else if (req.method === "PUT") {
    const body = req.body as UpdateTodoBody;
    const todo = await FileModel.findById(id);
    if (todo) {
      todo.set({ ...body });
      await todo.save();
      res.status(200).json(todo.toJSON());
    } else {
      res.status(404);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
