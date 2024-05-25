import ProfileControls from "../ProfileControls/ProfileControls";

export default function Navbar() {
  return (
    <div className="navbar container">
      <div className="row">
        <div className="navbar__profile-controls col-xs-12">
          <ProfileControls />
        </div>
      </div>
    </div>
  );
}
