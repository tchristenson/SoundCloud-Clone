import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneUserThunk } from "../../store/users";

function UserProfilePage() {
  const dispatch = useDispatch();
  //const profileUser = useSelector((state));
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getOneUserThunk(userId));
  }, [userId, dispatch]);

  const user = useSelector((state) => state.users[userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>Testing</h1>

      <div>
        {" "}
        <div>{user.profileImage} </div>
        <p>{user.username}</p>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div></div>
    </>
  );
}

export default UserProfilePage;
