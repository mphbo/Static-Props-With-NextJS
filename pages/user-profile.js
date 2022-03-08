import React from "react";

function UserProfile({ username }) {
  return <h1>{username}</h1>;
}

export default UserProfile;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
