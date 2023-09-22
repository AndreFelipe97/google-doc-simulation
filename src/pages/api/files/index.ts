import { FileModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";

interface CreateFileBody {
  title: string;
  slug: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  function geraStringAleatoria() {
    var stringAleatoria = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }
  if (req.method === "GET") {
    // for retrieving todos list
    const files = await FileModel.find({}).limit(10).lean();
    res.status(200).json(files);
  } else if (req.method === "POST") {
    // creating a single todo
    const body = req.body as CreateFileBody;
    const file = new FileModel({
      title: body.title,
      slug: `${body.title}-${geraStringAleatoria()}`,
    });
    await file.save();

    res.status(200).json(file.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
