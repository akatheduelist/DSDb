import React, { useState, useEffect } from "react";

function ProfilePage({ sessionUser }) {
  const [userImage, setUserImage] = useState(sessionUser.profile_image);
  const [userName, setUserName] = useState(sessionUser.full_name);
  const [userEmail, setUserEmail] = useState(sessionUser.email);
  const [userBio, setUserBio] = useState(sessionUser.bio);
  const [userBirthdate, setUserBirthdate] = useState(sessionUser.dob);

  return (
    <>
      <div className="flex gap-4 w-2/3 mx-auto my-12">
        <div>
          <img
            src={userImage}
            className="rounded-full w-48 h-48 object-cover"
            alt="User Image"
          />
          <button onClick={() => {}}>Change Image</button>
        </div>
        <div className="flex flex-col py-4">
          <span className="text-3xl">{userName}</span>
          <span>{userEmail}</span>
          <span className="my-2">{userBio}</span>
          <span>{userBirthdate}</span>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
