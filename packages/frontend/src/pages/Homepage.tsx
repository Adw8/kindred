import { useEffect, useState } from "react"
import axios from "axios";

import { Friend } from "@/types";
import HomepageHeader from "@/components/HomepageHeader";
import AddFriendDialog from "@/components/AddFriendDialog";
import FriendList from "@/components/FriendList";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Homepage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
    const friends = await axios.get(`${BACKEND_URL}/friends`)
    console.log(friends.data)
    setFriends(Object.values(friends.data));
    }

    getFriends();
  }, [])

  const addFriend = async (friendData: { name: string; birthday: string; info: string }) => {
    setOpenDialog(true);
    const friendResponse = await axios.post(`${BACKEND_URL}/add-friend`, friendData);

    const newFriend = friendResponse.data;

    setFriends((prevFriends) => {
      console.log({prevFriends})
      const currentFriends = Array.isArray(prevFriends) ? prevFriends : [];
      console.log({currentFriends})
      return [...currentFriends, newFriend];
    });
  };

  return (
    <>
      <HomepageHeader onAddFriendClick={() => setOpenDialog(true)} />
      <AddFriendDialog open={openDialog} onOpenChange={setOpenDialog} onAddFriend={addFriend} />
      <FriendList friends={friends} />
    </>
  )
}

export default Homepage;
