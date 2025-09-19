import css from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={css.wrapper}>
      <div className={css.loader}></div>
    </div>
  );
}
