import internal from "stream";

export interface ChannelDto {
  id: number;
  name: string;
  password: boolean;
  type: number;
}
/*type
1 chat
2 public
3 private
*/
