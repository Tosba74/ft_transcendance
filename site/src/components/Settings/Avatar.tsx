import React, { useRef, SyntheticEvent } from "react";
import axios from "axios";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";
interface AvatarProps {
  loginer: UseLoginDto;
  // refreshUserInfos: Function;
}

export default function Avatar({ loginer }: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = React.useState(
    loginer.userInfos?.avatar_url
  );
  const [avatarMessage, setAvatarMessage] = React.useState("");

  const fileInput: any = useRef();

  function fileValidation(): boolean {
    if (fileInput.current.files[0] === undefined) {
      setAvatarMessage("Error: file not detected");
      return false;
    }

    // validate type (jpg/png)
    if (
      fileInput.current.files[0].type !== "image/png" &&
      fileInput.current.files[0].type !== "image/jpg" &&
      fileInput.current.files[0].type !== "image/jpeg" &&
      fileInput.current.files[0].type !== "image/gif"
    ) {
      setAvatarMessage("Error: the image must be jpg or png");
      return false;
    }

    // validate size (1MO)
    if (
      fileInput.current.files[0].size < 1 ||
      fileInput.current.files[0].size > 1000000
    ) {
      setAvatarMessage("Error: maximum image size 1 MO");
      return false;
    }

    // eventually validate image proportion w/h and/or reformat image as a square ??
    // ...

    return true;
  }

  function randomFilename(currentName: string): string {
    const i: number = currentName.lastIndexOf(".");
    const extension: string = currentName.substring(i);
    const randomstring = require("randomstring");
    const random: string = randomstring.generate(8);
    return `${random}-${loginer.userInfos?.id}${extension}`;
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (fileValidation() === false) return;

    if (loginer.token) {
      const data = new FormData();
      const filename: string = randomFilename(fileInput.current.files[0].name);
      data.append("avatar", fileInput.current.files[0], filename);

      axios
        .put("/api/me/upload_image", data, {
          headers: {
            Authorization: `Bearer ${loginer.token}`,
          },
        })
        .then((res) => {
          // return new avatar_url
          setAvatarMessage("Image uploaded successfully");
          setAvatarUrl(res.data);
          loginer.getUserData();

          // refreshUserInfos();
          setTimeout(() => {
            setAvatarMessage("");
          }, 3000);
        })
        .catch(() =>
          setAvatarMessage(
            "Error while contacting the API. Retry after reloging."
          )
        );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <img className="h-60 w-auto" src={avatarUrl} />
      <label>Change avatar :</label>
      <input className="bg-slate-300 px-3 py-1" type="file" ref={fileInput} />
      <button type="submit" className="bg-blue-700 px-3 py-1 text-white">
        Save
      </button>
      <div>{avatarMessage}</div>
    </form>
  );
}
