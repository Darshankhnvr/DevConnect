import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="bg-white shadow rounded p-4 w-full md:w-64">
      <div className="text-center">
        <img
          src={user?.profilePic || "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid&w=740"}
          className="w-20 h-20 mx-auto rounded-full object-cover"
          alt="profile"
        />
        <h2 className="mt-2 font-semibold text-lg">{user?.name}</h2>
        <p className="text-sm text-gray-500">@{user?.username}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
