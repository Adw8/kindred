import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import { Friend } from '@/types';
import { supabase } from '@/lib/supabaseClient';

const FriendDetails = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [userId, setUserId] = useState<string>();
  const [friendDetails, setFriendDetails] = useState<Friend>()
  const { id } = useParams();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user.id);
    };

    getSession();
  }, []);

  useEffect(() => {
    if (!userId || !id) return;

    const getFriendDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/friend/${userId}/${id}`);
        setFriendDetails(response.data);
      } catch (err) {
        console.error('Failed to fetch friend details', err);
      }
    };

    getFriendDetails();
  }, [userId, id]);

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' };
    const formatter = new Intl.DateTimeFormat('en-IN', options);

    const formattedDate = formatter.format(date);
    return formattedDate;
  }

  return (
    <>
      {friendDetails ? (
        <div className="grid grid-cols-4 gap-4 min-h-screen">
          <div className="col-span-2 col-start-2 flex-col">
            <div className='text-4xl text-center font-normal'>{friendDetails.name}</div>
            <div className='text-center m-2'>
              Wish them on {formatDate(friendDetails.birthday)}
            </div>
            <div className='text-1xl text-center font-light m-20'>
                {friendDetails.info}
            </div>
          </div>
        </div>

      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default FriendDetails;
