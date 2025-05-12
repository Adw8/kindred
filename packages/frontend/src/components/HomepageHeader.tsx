import { Outlet } from 'react-router-dom';
import { ModeToggle } from "./modeToggle";

const HomepageHeader = () => {
  return (
    <>
      <div className="flex justify-between m-5">
        <div>
          <h1 className="text-4xl font-semibold">
            Kindred
          </h1>
          <p className="card mt-2">
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
