import React, { SyntheticEvent } from "react";
import axios from "axios";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";

interface PseudoProps {
  loginer: UseLoginDto;
  setPageErrorMessage: Function;
}

export default function Pseudo({ loginer, setPageErrorMessage }: PseudoProps) {
  const [pseudoInput, setPseudoInput] = React.useState(
    loginer.userInfos?.pseudo
  );

  function pseudoValidation(): boolean {
    // Plus de validation sur format des pseudo ? char autorises ?

    if (pseudoInput === "") {
      setPageErrorMessage("You must specify a pseudo");
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
            setPageErrorMessage("New pseudo saved");
            loginer.getUserData();
            // refreshUserInfos();
            setTimeout(() => {
              setPageErrorMessage("");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 401)
            var message: string = error.response.data.message
          else
            var message: string = "Error while contacting the API. Retry after reloging."
          setPageErrorMessage(
            message
          )
        }
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
    </form>
  );
}
