"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        // User image URL (optional)
        // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onSuccess: (ctx) => {
          window.alert("Success");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };
  const onLogin = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks

        onSuccess: (ctx) => {
          window.alert("Success");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };
  if(session){
    return(
      <div>
      <div>logged as {session.user.name}</div>
      <Button onClick={()=>authClient.signOut()}>Sign out</Button>
      </div>
    )
  }
  if(isPending){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className="">
      <Input
        placeholder="Username"
        name="username"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        name="username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        name="username"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant={"outline"} onClick={onSubmit}>
        Submit
      </Button>

      <div className="">
        <Input
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          name="username"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant={"outline"} onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default page;
