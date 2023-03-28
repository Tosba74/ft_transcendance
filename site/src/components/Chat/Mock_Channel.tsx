import { Channel } from "./Channel";

export const Mock_Channel = [
  new Channel({
    id: 1,
    name: "General",
    title: "",
    pwd: "",
    isPrivate: false,
    isProtected: false,
  }),
  new Channel({
    id: 2,
    name: "Les Coupains",
    title: "random",
    pwd: "",
    isPrivate: false,
    isProtected: false,
  }),
  new Channel({
    id: 3,
    name: "Workspace",
    title: "for worker",
    pwd: "",
    isPrivate: false,
    isProtected: false,
  }),
];
