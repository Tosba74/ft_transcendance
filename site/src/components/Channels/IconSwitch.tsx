import { MdOutlineEmail } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { FiLock } from "react-icons/fi";

import { ChannelDto } from "src/_shared_dto/channel.dto";

interface IconSwitchProps {
  channel: ChannelDto;
}
export default function IconSwitch({ channel }: IconSwitchProps) {
  return (
    <>
      {channel.type === 1 && (
        <MdOutlineEmail className="basis-1/6 self-center" title="Chat" />
      )}
      {channel.password && channel.type === 2 && (
        <MdKey className="basis-1/6 self-center " title="Password Required" />
      )}
      {!channel.password && channel.type === 2 && (
        <MdPublic className="basis-1/6 self-center" title="Public" />
      )}
      {channel.type === 3 && (
        <FiLock className="basis-1/6 self-center" title="Private" />
      )}
    </>
  );
}
