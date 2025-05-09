import { Button } from "@/components/ui/button";

interface HomepageHeaderProps {
  onAddFriendClick: () => void;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ onAddFriendClick }) => {
  return (
    <div className="ml-5 text-center mt-2">
      <h1 className="text-5xl font-semibold">
        Kindred
      </h1>
      <p className="card mt-2">
        Stay closer with your loved ones.
      </p>
      <div className="mt-5">
        <Button variant="outline" onClick={onAddFriendClick}>Add friend</Button>
      </div>
    </div>
  );
};

export default HomepageHeader;
