import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { SignOut } from "../../components/ui/auth/sign-out";

type Props = {
  children: React.ReactNode;
};

async function layout(props: Props) {
  const { children } = props;
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");
  return (
    <div>
      {children}
      <SignOut />
    </div>
  );
}

export default layout;
