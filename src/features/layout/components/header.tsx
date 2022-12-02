import Link from "next/link";
import { LogoutButton } from "../../auth/components/logout-button";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { CharacterDetails } from "../../character/components/character-details";

export const Header = (): JSX.Element => {
  const { isAuthenticated } = useAuthContext();
  return (
    <header className="flex px-5 pt-5">
      <Link href="/" className="mr-auto">
        <button className="btn">Home</button>
      </Link>
      {isAuthenticated && <CharacterDetails />}
      <LogoutButton />
    </header>
  );
};
