import React from "react";

export default function Detail(props) {
  return (
    <div>
      {console.log(props.match)}
      Giá trị tham số: {props.match.params.id}
      <br />
      Path name hiện tại: {props.match.path}
    </div>
  );
}
