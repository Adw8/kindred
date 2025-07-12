import { NavLink, Outlet } from 'react-router-dom';
import { ModeToggle } from "./modeToggle";

const HomepageHeader = () => {
  return (
    <>
      <div className="flex justify-between m-5">
        <div>
          <NavLink to="/" end>
            <h1 className="text-4xl font-semibold">
              Kindred
            </h1>
          </NavLink>
          <p className="card mt-2 font-normal">
            Stay closer with your loved ones.
          </p>
        </div>
        <ModeToggle />
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default HomepageHeader;
