import React from "react";

const LoadMoreDataBtn = ({ state, fetchData }) => {
  if (state != null && state.totalDocs > state.results.length) {
    return (
      <button
        onClick={() => fetchData({ page: state.page + 1 })}
        className="p-2 text-dark-grey px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
      >
        Xem thêm
      </button>
    );
  }
};

export default LoadMoreDataBtn;
