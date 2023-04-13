import React, { SyntheticEvent } from "react";
import axios from "axios";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface TfaConfirmationProps {
  loginer: UseLoginDto;
  qrCode: string;
  switchTfaOn: Function;
  setTfaMessage: Function;
}

export default function TfaConfirmation(props: TfaConfirmationProps) {
  const { loginer, qrCode, setTfaMessage, switchTfaOn } = props;

  const [codeInput, setCodeInput] = React.useState("");

  const handleUpdate = async (value: string) => {
    if (value != null && !isNaN(Number(value.toString())))
      setCodeInput(value.substring(0, 6));
  };

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (loginer.token) {
      axios
        .post(
          "/api/tfa/confirm-activation",
          { tfa_code: codeInput },
          {
            headers: {
              Authorization: `Bearer ${loginer.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data === true) switchTfaOn();
        })
        .catch(() => {
          setTfaMessage("Code invalid");
          setTimeout(() => {
            setTfaMessage("");
          }, 3000);
        });
    }
  }

  return (
    <form className="flex flex-col mt-4 lg:mt-16 items-center justify-center">
      <label className="text-center">Scan this qrcode and confirm</label>
      <img className="mt-2 h-48 w-48" src={qrCode} />
      <label className="mt-2 text-center">Confirmation:</label>
        <input
          className="w-64 bg-slate-300 px-3 py-1"
          type="text"
          placeholder="_ _ _ _ _ _"
          value={codeInput}
          onChange={(e) => handleUpdate(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-2 rounded bg-cyan-500 px-3 py-1 text-white"
        >
          Confirm
        </button>
    </form>
  );
}
