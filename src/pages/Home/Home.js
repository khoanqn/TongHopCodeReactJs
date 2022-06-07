import React from "react";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      Home
      <div>React version: {React.version}</div>
    </div>
  );
}
