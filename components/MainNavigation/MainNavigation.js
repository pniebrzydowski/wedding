import Link from "next/link";

const routes = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/about",
    title: "About Us",
  },
  {
    url: "/location",
    title: "Location",
  },
];

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
