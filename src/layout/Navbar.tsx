import { Link, useLocation } from "react-router-dom";
import { Button, Tooltip } from "@shopify/polaris";

const Navbar = () => {
  const location = useLocation();

  let message = "🟢 Explore all the contests...";
  if (location.pathname === "/") {
    message = "🚫 You're already viewing all the contests!";
  }

  let messageFev = "💖 Check out your favorite contests!";
  if (location.pathname === "/favourites") {
    messageFev = "🚫 You're already on the favorites page!";
  }

  return (
    <div className="nav">
      <div className="flex gap">
        <Tooltip content= {message}>
          <Link to="/">
            <Button size="large">🔥 All Contests</Button>
          </Link>
        </Tooltip>
        <Tooltip content= {messageFev}>
        <Link to="/favourites">
          <Button size="large">🧑‍💻 Favourite Contests</Button>
        </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
