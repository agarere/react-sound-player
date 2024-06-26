import React, { useState } from 'react';
import axios from 'axios';
import './player.css'

const SoundPlayer = () => {
  const [audioUrl, setAudioUrl] = useState(null);

  const downloadSound = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/sounds/download/734fb05a-7c6e-4375-98e1-5f5ee09d4c56', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      setAudioUrl(url);
    } catch (error) {
      console.error('Error downloading the sound file:', error);
    }
  };

  return (
    <div className='player-container'>
      <button onClick={downloadSound}>Download and Play Sound</button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default SoundPlayer;
