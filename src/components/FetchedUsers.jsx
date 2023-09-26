import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsersAsync } from "../redux/users/usersSlice";

function FetchedUsers() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.usersSlice);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {users.results.map((user, index) => (
            <div key={index}>
              <p>First Name: {user.name.first}</p>
              <p>Last Name: {user.name.last}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FetchedUsers;
