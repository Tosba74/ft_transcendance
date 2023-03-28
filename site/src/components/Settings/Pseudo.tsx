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
        .catch(() =>
          setPseudoInputMessage(
            "Error while contacting the API. Retry after reloging."
          )
        );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Pseudo :</label>
      <input
        className="bg-slate-300 px-3 py-1"
        type="text"
        name="pseudo"
        value={pseudoInput}
        onChange={(event) => setPseudoInput(event.target.value)}
      />
      <button type="submit" className="bg-blue-700 px-3 py-1 text-white">
        Save
      </button>
      <div>{pseudoInputMessage}</div>
    </form>
  );
}
