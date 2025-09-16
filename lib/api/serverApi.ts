import { fetchNotesProps, Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { CheckSessionRequest } from "@/types/user";

export const fetchNotesServer = async (
  page: number,
  query: string,
  tag: Note["tag"] | undefined
) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<fetchNotesProps>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      page,
      search: query,
      tag,
    },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (noteId: Note["id"]) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
