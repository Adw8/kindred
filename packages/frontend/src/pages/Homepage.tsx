import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"


const Homepage = () => {
  const data = {
    1: { id: 1, name: "Alice Johnson", birthday: "1995-04-12", info: "Loves hiking and photography." },
    2: { id: 2, name: "Brian Lee", birthday: "1993-11-23", info: "Software developer and coffee enthusiast." },
    3: { id: 3, name: "Catherine Smith", birthday: "1997-07-08", info: "Avid traveler and foodie." },
  }
  const [friends, setFriends] = useState(data);

  const addFriend = () => {
    const newId = Object.keys(friends).length > 0 ? Math.max(...Object.keys(friends).map(Number)) + 1 : 1;
    const newFriend = {
      id: newId,
      name: `Friend ${newId}`,
      birthday: new Date().toISOString().slice(0, 10), // Get today's date in YYYY-MM-DD format
      info: "This is a new friend."
    };
    setFriends(prevFriends => ({ ...prevFriends, [newId]: newFriend }));
  };

  return (
    <>
      <div className="ml-5 text-center">
        <h1 className="text-5xl font-semibold">
        Kindred.
        </h1>
          <p className="card mt-2">
            Stay closer with your loved ones.
          </p>
        <div className="mt-5">
        <Button variant="outline" onClick={addFriend}>Add friend</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 m-5 gap-4 ">
        {friends && Object.values(friends).map((friend) => (
          <div key={friend.id} className="font-normal flex-grow">
            <Card>
              <CardHeader>
                <CardTitle>{friend.name}</CardTitle>
                <CardDescription>{friend.birthday}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{friend.info}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit</Button>
              </CardFooter>
            </Card>
          </div>
          ))}
      </div>
    </>

  )
}

export default Homepage