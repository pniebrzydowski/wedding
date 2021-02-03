import Link from "next/link";
import routes from "./routes";

const MainNavigation = () => (
  <nav>
    <ul>
      {routes.map((route) => (
        <Link href={route.url} key={route.url}>
          <a>{route.title}</a>
        </Link>
      ))}
    </ul>
  </nav>
);

export default MainNavigation;
