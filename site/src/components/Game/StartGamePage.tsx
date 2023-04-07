import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface StartGamePageProps {
  loginer: UseLoginDto;
}

export default function StartGamePage({ loginer }: StartGamePageProps) {
  return (
    <>
      <h1 className="text-2xl">Game</h1>
      <button>Quick play</button>
      <label>ID Game</label>
      <input type="text" value={"id: number"} />
      <button>Join</button>
      <h2>Last games</h2>
      <ul>
        <li>7 Tiago vs Jerome 3</li>
        <li>7 Tiago vs Jerome 3</li>
        <li>7 Tiago vs Jerome 3</li>
        <li>7 Tiago vs Jerome 3</li>
        <li>7 Tiago vs Jerome 3</li>
      </ul>
    </>
  );
}
