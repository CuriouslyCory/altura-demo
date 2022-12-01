import Link from "next/link";
import { LogoutButton } from "../../auth/components/logout-button";

export const Header = (): JSX.Element => {
  return (
    <header className="flex justify-between px-5 pt-5">
      <Link href="/">Home</Link>
      <LogoutButton />
    </header>
  );
};
