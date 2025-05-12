import { useEffect, useState } from "react"
import axios from "axios";

import { Friend } from "@/types";
import AddFriendDialog from "@/components/AddFriendDialog";
import FriendList from "@/components/FriendList";
import { Button } from "@/components/ui/button";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

type HomepageProps = {
  userId: string,
}

const Homepage: React.FC<HomepageProps> = ({ userId }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log('Fetching friends for user: ', userId);
    const getFriends = async () => {
      const friends = await axios.get(`${BACKEND_URL}/friends/${userId}`);
      console.log(friends.data)
      setFriends(Object.values(friends.data));
    }

    getFriends();
  }, [userId])

  const addFriend = async (friendData: { name: string; birthday: string; info: string }) => {
    setOpenDialog(true);
    const friendResponse = await axios.post(`${BACKEND_URL}/add-friend`, {
      userId,
      ...friendData,
    });

    const newFriend = friendResponse.data;

    setFriends((prevFriends) => {
      console.log({ prevFriends })
      const currentFriends = Array.isArray(prevFriends) ? prevFriends : [];
      console.log({ currentFriends })
      return [...currentFriends, newFriend];
    });
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className="mt-5 flex justify-center">
          <Button variant="outline" onClick={() => setOpenDialog(true)}>Add friend</Button>
        </div>
        <AddFriendDialog open={openDialog} onOpenChange={setOpenDialog} onAddFriend={addFriend} />
        <FriendList friends={friends} />
      </div>
    </>
  )
}

export default Homepage;
