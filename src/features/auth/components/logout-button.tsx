import { useAuthContext } from "../hooks/use-auth-context";

export const LogoutButton = (): JSX.Element => {
  const { isAuthenticated, handleLogout } = useAuthContext();

  if (!isAuthenticated) return <></>;

  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
};
