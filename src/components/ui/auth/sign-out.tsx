import { logout } from "../../../app/actions/auth";

export function SignOut() {
  return (
    <form action={logout}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
