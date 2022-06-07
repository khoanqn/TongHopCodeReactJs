import React from "react";

export default function pagenotfound(props) {
  return (
    <div>
      <h4>Đây là props {console.log(props)}</h4>
      <h5>Không tìm thấy trang {props.match.url}</h5>
    </div>
  );
}
