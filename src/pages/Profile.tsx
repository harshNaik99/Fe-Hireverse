import { useAuthStore } from "../context/authStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-4">Your Profile</h2>

      <div className="bg-white shadow p-6 rounded-lg border">
        <p className="text-lg">
          <strong>Name:</strong> {user?.name}
        </p>

        <p className="text-lg mt-2">
          <strong>Email:</strong> {user?.email}
        </p>

        {user?.userType && (
          <p className="text-lg mt-2">
            <strong>User Type:</strong> {user?.userType}
          </p>
        )}

        <button
          className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={clearUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
