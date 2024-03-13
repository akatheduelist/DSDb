import React, { useState, useEffect } from "react";

function ProfilePage({ sessionUser }) {
  const [userImage, setUserImage] = useState(sessionUser.profile_image);
  const [userName, setUserName] = useState(sessionUser.full_name);
  const [userEmail, setUserEmail] = useState(sessionUser.email);
  const [userBio, setUserBio] = useState(sessionUser.bio);
  const [userBirthdate, setUserBirthdate] = useState(sessionUser.dob);

  console.log(sessionUser);

  return (
    <>
      <h1>Profile Page</h1>
      <div>
        <img src={userImage} alt="User Image" />
        <button onClick={() => {}}>Change Image</button>
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={() => {}}>Change Name</button>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button onClick={() => {}}>Change Email</button>
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
        />
        <button onClick={() => {}}>Change Bio</button>
      </div>
      <div>
        <label>Birthdate:</label>
        <input
          type="date"
          value={userBirthdate}
          onChange={(e) => setUserBirthdate(e.target.value)}
        />
        <button onClick={() => {}}>Change Birthdate</button>
      </div>
    </>
  );
}

export default ProfilePage;
