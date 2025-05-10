import { ModeToggle } from "./modeToggle";

const HomepageHeader = () => {
  return (
    <div className="flex justify-between">
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
  );
};

export default HomepageHeader;
