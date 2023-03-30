import React from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";

export default function AddFriend({ loginer }: { loginer: UseLoginDto }) {
  const [loginName, setLoginName] = React.useState("");

  const handleSubmit = () => {
    // example
    // axios
    //   .post(`/api/me/friends/${user.id}`, loginer.get_headers())
    //   .then((res) => {
    //     if (res.status === 201) {
    //       console.log(res.data);
    //       // setUsers(res.data as UserDto[]);
    //       return;
    //     }
    //   })
    //   .catch((error) => {});
    console.log("hello");
  };

  return (
    <form className="flex flex-col pt-3" onSubmit={handleSubmit}>
      <div className="center mx-auto mb-3 flex flex-row items-center">
        <label className="text-sl pr-4 text-right font-medium text-gray-900 dark:text-gray-800">
          Add Friend
        </label>
        <input
          className="w-3/5 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mx-auto rounded-lg bg-blue-700 px-5 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Friend
      </button>
    </form>
  );
}
