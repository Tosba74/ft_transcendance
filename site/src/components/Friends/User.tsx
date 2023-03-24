import React from "react";
import UserStatus from "./UserStatus";

interface UserProps {
  id: number;
  children?: React.ReactNode;
}

export default function User(props: UserProps) {
  let name: string = "Random";
  if (props.id === 1) {
    name = "Victor";
  } else if (props.id === 2) {
    name = "Jarom";
  } else if (props.id === 3) {
    name = "Julien";
  }

  return (
    <>
      {props.children}
      {name}
    </>
  );
}
