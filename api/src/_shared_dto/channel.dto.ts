import internal from "stream";

export class ChannelDto {
  id: number;
  name: string;
  password: boolean;
  type: number;
  role?: number;
}
/*type
1 chat
2 public
3 private
*/
