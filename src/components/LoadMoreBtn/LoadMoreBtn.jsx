import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={css.LoadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
