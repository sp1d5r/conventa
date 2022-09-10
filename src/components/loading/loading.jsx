import React from "react";

function Loading() {
  return (
    <div className={"academy-content"}>
      <div className={"academy-loading-container"}>
        <img
          src={require("../../assets/Icons/loading.gif")}
          alt={"loading your content"}
        />
        <p>Loading ...</p>
      </div>
    </div>
  );
}

export default Loading;
