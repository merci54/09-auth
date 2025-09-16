import css from "./LayoutNotes.module.css";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function LayoutNotes({ sidebar, children }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
