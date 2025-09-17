import { fetchNotesProps, Note } from "@/types/note";
import { nextServer } from "./api";
import { AuthProps, User } from "@/types/user";

export const menuTags = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export const fetchNotes = async (
  page: number,
  query: string,
  tag: Note["tag"] | undefined
) => {
  const res = await nextServer.get<fetchNotesProps>("/notes", {
    params: {
      page,
      search: query,
      tag,
    },
  });
  return res.data;
};

export const deleteNote = async (id: Note["id"]) => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
) => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const register = async (data: AuthProps) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: AuthProps) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export type UpdateMeProps = {
  username: string;
  email?: string;
};

export const updateMe = async (data: UpdateMeProps) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};
