import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { tokenDuration } from "../utils/auth";
import MainNavigation from "../components/MainNavigation";

import { useSubmit } from "react-router-dom";
function RootLayout() {
  const token = useLoaderData();
  // programatically submit the form
  const submit = useSubmit();


  useEffect(() => {

    // if the token not exist, do nothing
    if (!token) {
      return;
    }
    // if the token is expired
    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
      return;
    }
    const duration = tokenDuration();
    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, duration);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
