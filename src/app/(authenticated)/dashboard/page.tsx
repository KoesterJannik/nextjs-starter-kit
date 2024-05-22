import { auth } from "../../../../auth";

async function page() {
  const session = await auth();
  return <div>Hello, {session?.user?.name}</div>;
}

export default page;
