import { useNavigate } from "react-router-dom";

import { Friend } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FriendListProps {
  friends: Friend[];
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 m-5 gap-4 ">
      {friends && Object.values(friends).map((friend) => (
        <div key={friend.id} className="font-normal flex-grow">
          <Card>
            <CardHeader>
              <CardTitle>{friend.name}</CardTitle>
              <CardDescription>{new Date(friend.birthday).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{friend.info}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => {
                navigate(`/friend/${friend.id}`)
              }}>
                Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
