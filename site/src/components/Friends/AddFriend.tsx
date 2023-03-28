function handleSubmit() {
  console.log("hello");
}

export default function AddFriend() {
  return (
    <form onSubmit={handleSubmit}>
      <label>Add Friend</label>
      <br />
      <input className="bg-slate-300 px-3 py-1" />
      <br />
      <button type="submit" className="bg-blue-700 px-3 py-1 text-white">
        Add Friend
      </button>
    </form>
  );
}
