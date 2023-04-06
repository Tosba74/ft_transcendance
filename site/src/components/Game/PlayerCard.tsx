import { UserDto } from "src/_shared_dto/user.dto";
import LogoInconnu from "../../assets/img/inconnu.jpeg";
import classNames from "classnames";

interface playerCardProps {
  isRight: boolean;
  user?: UserDto;
  status?: boolean;
}

export default function PlayerCard(props: playerCardProps) {
  let userId = "";

  if (props.isRight) {
    userId = "2";
  }

  return (
    <>
      <div className="flex flex-auto items-center pb-2">
        <img
          className={classNames("h-12 w-12 rounded-full object-cover", {
            "order-last": props.isRight,
          })}
          src={props.user?.avatar_url || LogoInconnu}
          alt={`Player-${props.user?.pseudo}`}
        />
        <div className="flex-auto px-3">
          <div
            className={classNames("flex truncate", {
              "justify-end": props.isRight,
            })}
          >
            <span className={classNames({ "order-last": props.isRight })}>
              {props.user?.pseudo || `Waiting player`}
            </span>
            <span className="px-3">{props.status ? "Ready" : "Unready"}</span>
          </div>
          <div
            id={`myProgress${userId}`}
            className="borde rounded-lg bg-slate-200 shadow-inner"
          >
            <div
              id={`myBar${userId}`}
              className={classNames("h-8 bg-green-500", {
                "mr-0 ml-auto": props.isRight,
              })}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
