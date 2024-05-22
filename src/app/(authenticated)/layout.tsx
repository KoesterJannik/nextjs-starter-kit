import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import { DashboardLayout } from "../../components/ui/auth/DashboardLayout";

type Props = {
  children: React.ReactNode;
};

async function layout(props: Props) {
  const { children } = props;
  const session = await auth();
  if (!session?.user) return redirect("/sign-in");
  return <DashboardLayout user={session?.user}>{children}</DashboardLayout>;
}

export default layout;
