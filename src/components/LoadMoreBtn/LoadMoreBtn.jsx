const LoadMoreBtn = ({ onLoadMore, hasMore }) => {
  return (
    <>
      {hasMore && (
        <button
          onClick={onLoadMore}
          style={{ margin: "10px auto", display: "block" }}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default LoadMoreBtn;
