import {useParams} from "react-router";
import {useEffect} from "react";

const UserPage = () => {

  const { userId } = useParams();

  useEffect(() => {
    document.title = "User with id: " + userId;
  })

  return (
    <>
      <h1 className="text-center">User with id: {userId}</h1>
    </>
  )
}
export default UserPage;