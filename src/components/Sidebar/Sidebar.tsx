import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <SidebarLink href="/profile/my-recipes">My Recipes</SidebarLink>
          </li>
          <li>
            <SidebarLink href="/profile/favorite-recipes">
              Favorite Recipes
            </SidebarLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
