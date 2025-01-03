
import { Link } from "react-router-dom";
import { Button } from "@shopify/polaris";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="flex gap">       
        <Link to="/">
          <Button size="large">All Contests</Button>
        </Link>
        <Link to="/favourites">
          <Button size="large">Favourite Contests</Button>
        </Link>

      </div>     
    </div>
  );
};

export default Navbar;
