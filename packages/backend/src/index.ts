import express, { Request, Response } from 'express';
import cors from 'cors';
import { addFriendToDatabase, getFriendDetails, getFriendsForUser } from './utils/db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

app.get('/api/friends/:userId', async (req: Request, res: Response) => {
  try {
    const friends = await getFriendsForUser(req.params.userId);
    res.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

app.post('/api/add-friend', async (req: Request, res: Response) => {
  try {
    const { userId, name, birthday, info } = req.body;

    if (!name || !birthday || !info) {
      res.status(400).json({ error: 'All fields are required' });
    }

    await addFriendToDatabase(userId, name, birthday, info);

    res.status(200).json('Friend added successfully!');
  } catch (error) {
    console.error('Error Adding friend to DB:', error);
    res.status(500).json({ error: 'Error Adding friend to DB' });
  }
});

app.get('/api/friend/:userId/:friendId', async (req: Request, res: Response) => {
  try {
    const { friendId, userId } = req.params;
    if (!friendId || !userId) {
      res.status(500).json({error: 'FriendId and userId are required' })
    }
    const friendDetails = await getFriendDetails(friendId, userId);
    res.json(friendDetails);
  } catch (error) {
    console.error('Error fetching friend details:', error);
    res.status(500).json({ error: 'Failed to fetch friend details' });
  }
})
