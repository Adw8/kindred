import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  onFriendDeleted: (deletedFriendId: number) => void;
  userId: string;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onFriendDeleted, userId }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleDeleteFriend = async (friendId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this friend? This action cannot be undone.");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/friend/${userId}/${friendId}`);
      console.log(`Friend ${friendId} deleted successfully.`);
      onFriendDeleted(friendId);
    } catch (error) {
      console.error('Error deleting friend: ', error);
      alert('Failed to delete friend. Please try again.');
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5 gap-4">
      {friends && Object.values(friends).map((friend) => (
        <div key={friend.id} className="font-normal flex-grow">
          <Card className="h-full overflow-hidden break-words">
            <CardHeader>
              <CardTitle className="truncate">{friend.name}</CardTitle>
              <CardDescription className="truncate">
                {new Date(friend.birthday).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm break-words whitespace-pre-wrap">
              <p>{friend.info}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant="outline" onClick={() => {
                navigate(`/friend/${friend.id}`)
              }}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteFriend(friend.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))
      }
    </div >
  );
};

export default FriendList;
