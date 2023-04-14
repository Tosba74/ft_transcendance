import React from "react";
import axios from "axios";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import { UserGameDto } from "src/_shared_dto/user-game.dto";

export default function HistoryGames({ loginer }: { loginer: UseLoginDto }) {
  const [history, setHistory] = React.useState<UserGameDto[]>([]);

  React.useEffect(() => {
    axios
      .get("/api/games/recent", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          setHistory(res.data as UserGameDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, [loginer]);

  return (
    <>
      <h3 className="text-blueGray-700 mb-1 text-center text-2xl font-semibold leading-normal">
        Last games
      </h3>

      <div className="text-blueGray-700 text-md grid grid-cols-[minmax(0,_1fr)_50px_minmax(0,_1fr)] border p-4 text-center leading-relaxed">
        {(history.length > 0 &&
          history.map((histo) => {
            return (
              <React.Fragment key={histo.id}>
                <span className="justify-self-end">{`${histo.user1.pseudo} ${histo.user1_score}`}</span>
                <span className="justify-self-center">{`vs`}</span>
                <span className="justify-self-start">{`${histo.user2_score} ${histo.user2.pseudo}`}</span>
              </React.Fragment>
            );
          })) || <span className="col-span-3">No history</span>}
      </div>
    </>
  );
}
