import { Profile } from "./Profile";
import LogoInconnu from '../../assets/img/inconnu.jpeg'

export const Mock_Profile = [
  new Profile({
    id: 1,
	  login: "jjaquemet",
	  name: "jaquemet",
	  firstname: "Jerome",
	  title: "The philantrope",
	  description: "The philantrope",
	  gameplay: 0,
    imageUrl: {LogoInconnu},
    contractTypeId: 1,
    contractSignedOn: "2023-02-04T21:42:42.473Z",
    isActive: false
  }),
  new Profile({
    id: 2,
	  login: "tnanchen",
	  name: "nanchen",
	  firstname: "Thomas",
	  title: "",
	  description: "",
	  gameplay: 0,
    imageUrl: {LogoInconnu},
    contractTypeId: 2,
    contractSignedOn: "2023-02-04T21:42:42.473Z",
    isActive: false
  }),
]