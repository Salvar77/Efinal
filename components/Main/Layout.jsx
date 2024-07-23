import Nav from "@/components/Nav/Nav";
import classes from "../../styles/Index.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={classes.index}>
        <div className={classes.index__box}>
          <button
            onClick={() => signIn("google")}
            className={classes.index__btn}
          >
            Zaloguj do Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.user}>
      <Nav />
      <div className={classes.userInfo}>
        <div className={classes.log}>{children}</div>
      </div>
    </div>
  );
}
