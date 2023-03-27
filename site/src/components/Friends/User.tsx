import React from "react";

interface UserProps {
  user: {
    id: number;
    login_name: string;
    pseudo: string;
    avatar_url: string;
    is_admin: boolean;
    access_token: null;
    color: number;
    tfa_enabled: boolean;
    status_updated_at: string;
    created_at: string;
    updated_at: string;
    validate_date: null;
    status: string;
  };
  children?: React.ReactNode;
}

export default function User(props: UserProps) {
  return (
    <>
      {props.children}
      {props.user.login_name}
    </>
  );
}
