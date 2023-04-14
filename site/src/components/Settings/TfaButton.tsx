import React, { SyntheticEvent } from "react";
import TfaConfirmation from "./TfaConfirmation";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";

interface TfaButtonProps {
  loginer: UseLoginDto;
}

export default function TfaButton({ loginer }: TfaButtonProps) {
  const [tfaInput, setTfaInput] = React.useState("");

  const [tfaLabelMessage, setTfaLabelMessage] = React.useState("");
  const [tfaMessage, setTfaMessage] = React.useState("");
  const [tfaButtonMessage, setTfaButtonMessage] = React.useState("");

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [qrCode, setQrCode] = React.useState("");

  // charge les messages correct au premier rendu de la page
  React.useEffect(() => {
    loginer.userInfos?.tfa_enabled === false
      ? setTfaInput("no")
      : setTfaInput("yes");
    loginer.userInfos?.tfa_enabled === false
      ? setTfaLabelMessage("disabled")
      : setTfaLabelMessage("enabled");
    loginer.userInfos?.tfa_enabled === false
      ? setTfaButtonMessage("Turn on")
      : setTfaButtonMessage("Turn off");
  }, [loginer.userInfos]);

  function switchTfaOn() {
    setQrCode("");
    setTfaInput("yes");
    setTfaLabelMessage("enabled");
    setTfaMessage("Tfa turned on");
    setTfaButtonMessage("Turn off");
    loginer.getUserData();
    // refreshUserInfos();
    setTimeout(() => {
      setTfaMessage("");
    }, 3000);
  }

  function switchTfaOff() {
    setTfaInput("no");
    setTfaLabelMessage("disabled");
    setTfaMessage("Tfa turned off");
    setTfaButtonMessage("Turn on");
    loginer.getUserData();
    // refreshUserInfos();
    setTimeout(() => {
      setTfaMessage("");
    }, 3000);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (loginer.token) {
      let route: string = "";
      tfaInput === "no" ? (route = "turn-on") : (route = "turn-off");

      // fetch car besoin de la reponse entiere pour utiliser blob() (axios desarialize tout  en json)
      fetch(`/api/tfa/${route}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginer.token}`,
        },
      })
        .then(async (res) => {
          // with turn-on api return qr code on success / with turn-off api return 'disabled' on success
          if (route === "turn-on") {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setQrCode(url);

            setButtonDisabled(true); /* mettre le bouton turn-on en disabled */
            // setTfaButtonMessage('Refresh QR');		/* ou mettre le texte du bouton en refresh */
          } else switchTfaOff();
        })
        .catch(() =>
          setTfaMessage("Error while contacting the API. Retry after reloging.")
        );
    }
  }

  return (
    <div className="flex w-full justify-center p-2 dark:text-white">
      <div className="justify-center dark:text-white">
        <form onSubmit={handleSubmit}>
          <label className="text-center">
            Two factor authentication is {tfaLabelMessage} .{" "}
          </label>
          <div className="mt-2 flex w-full justify-center">
            <button
              id="tfa_enable"
              className="mr-2 rounded bg-cyan-500 px-3 py-1 text-white"
              type="submit"
              name="tfa_enable"
              value={tfaInput}
              disabled={buttonDisabled}
            >
              {tfaButtonMessage}
            </button>
          </div>
        </form>
        {qrCode !== "" && (
          <TfaConfirmation
            loginer={loginer}
            qrCode={qrCode}
            switchTfaOn={switchTfaOn}
            setTfaMessage={setTfaMessage}
          />
        )}
        <div className="mt-2 text-center">{tfaMessage}</div>
      </div>
    </div>
  );
}
