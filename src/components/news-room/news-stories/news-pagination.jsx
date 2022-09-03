import React, { useState } from "react";

function NewsPagination({ update_page, total_pages }) {
  const [current_page, update_current_page] = useState(1);

  const _update_page = (page) => {
    update_current_page(page);
    update_page(page);
  };

  const render_pages = () => {
    return [...Array(total_pages)].map((x, i) => {
      if (i + 1 === current_page) {
        return <div className={"news-pagination-number-selected"}>{i + 1}</div>;
      } else {
        return (
          <div
            className={"news-pagination-number"}
            onClick={(_) => {
              _update_page(i + 1);
            }}
          >
            {i + 1}
          </div>
        );
      }
    });
  };

  return <div className={"news-pagination-container"}>{render_pages()}</div>;
}

export default NewsPagination;
