import React, { SyntheticEvent } from "react";
import axios from "axios";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";

interface PseudoProps {
  loginer: UseLoginDto;
}

export default function Pseudo({ loginer }: PseudoProps) {
  const [pseudoInput, setPseudoInput] = React.useState(
    loginer.userInfos?.pseudo
  );
  const [pseudoInputMessage, setPseudoInputMessage] = React.useState("");

  function pseudoValidation(): boolean {
    // ICI AJOUTER VALIDATION SUR FORMAT MINIMUM DE PSEUDO

    if (pseudoInput === "") {
      setPseudoInputMessage("You must specify a pseudo");
      return false;
    }

    return true;
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (pseudoValidation() === false) return;

    if (loginer.token) {
      axios
        .patch(
          "/api/me/update_pseudo",
          { pseudo: pseudoInput },
          {
            headers: {
              Authorization: `Bearer ${loginer.token}`,
            },
          }
        )
        .then((res) => {
          // return true if pseudo successfully changed
          if (res.data === true) {
            setPseudoInputMessage("New pseudo saved");
            loginer.getUserData();
            // refreshUserInfos();
            setTimeout(() => {
              setPseudoInputMessage("");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 401)
            var message: string = error.response.data.message;
          else
            var message: string =
              "Error while contacting the API. Retry after reloging.";
          setPseudoInputMessage(message);
        });
    }
  }

  return (
    <form className="h-1/3 w-full" onSubmit={handleSubmit}>
      <div className="flex h-10 items-center justify-center">
        <label className="dark:text-white">Pseudo: </label>
      </div>
      <div className="flex h-10 w-full items-center justify-center gap-2">
        <input
          className="h-8 w-4/6 bg-slate-300 dark:bg-gray-800 dark:text-white"
          type="text"
          name="pseudo"
          value={pseudoInput}
          onChange={(event) => setPseudoInput(event.target.value)}
        />
        <button
          type="submit"
          className="rounded bg-cyan-500 px-2 py-1 text-white"
        >
          Save
        </button>
        <div>{pseudoInputMessage}</div>
      </div>
    </form>
  );
}
