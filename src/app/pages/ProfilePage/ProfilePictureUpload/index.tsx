import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileSlice } from '../slice';
import { selectProfile } from '../slice/selectors';

export const ProfilePictureUpload = () => {
  const [profilePictureFile, setProfilePictureFile] = useState<string | Blob>(
    '',
  );

  const dispatch = useDispatch();
  const { actions } = useProfileSlice();

  const { currentUser } = useSelector(selectProfile);

  const handleUploadProfilePicture = async () => {
    const data = new FormData();
    data.append('file', profilePictureFile);
    data.append('upload_preset', 'fiona-app');
    data.append('cloud_name', 'entropiya');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/entropiya/image/upload',
      {
        method: 'post',
        body: data,
      },
    );

    const responseData = await response.json();

    dispatch(actions.updateProfilePicture(responseData.url.toString()));
  };

  return (
    <div>
      <Button variant="contained" component="label">
        Upload file
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e: any) => setProfilePictureFile(e.target.files[0])}
        />
      </Button>
      <Button onClick={handleUploadProfilePicture}>Submit</Button>
      {currentUser.profilePictureUrl?.length ? (
        <img
          src={currentUser.profilePictureUrl}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      ) : null}
    </div>
  );
};
