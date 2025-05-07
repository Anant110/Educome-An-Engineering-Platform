import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Videos.css';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FaWhatsapp, FaInstagram, FaTwitter, FaLink, FaPlaystation, FaPlayCircle } from 'react-icons/fa';

const Videos = () => {
  const location = useLocation();
  let query = location.state?.query || '';

  const navigate = useNavigate();

  const [prompt, setPrompt] = useState(query);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const API_KEY = "AIzaSyBWWhu9BdpVY_joB0kw2YekEfQ4us8xaxo";

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const fetchVideoDetails = async (videoIds) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds.join(',')}&key=${API_KEY}`
      );
      return response.data.items;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return [];
    }
  };

  const searchYouTubeVideos = async () => {
    try {
      let nextPageToken = '';
      let fetchedVideos = [];

      while (fetchedVideos.length < 35 && nextPageToken !== undefined) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${prompt}&type=video&maxResults=50&pageToken=${nextPageToken}`
        );

        fetchedVideos = fetchedVideos.concat(response.data.items);
        nextPageToken = response.data.nextPageToken;
      }

      const videoIds = fetchedVideos.map((video) => video.id.videoId);
      const videoDetails = await fetchVideoDetails(videoIds);

      const videosWithDetails = fetchedVideos.map((video) => {
        const details = videoDetails.find((detail) => detail.id === video.id.videoId);
        return {
          ...video,
          statistics: details?.statistics,
          contentDetails: details?.contentDetails,
          snippet: details?.snippet,
        };
      });

      const filteredVideos = videosWithDetails.filter((video) => {
        const viewCount = parseInt(video.statistics?.viewCount, 10);
        return viewCount > 200000;
      });

      const sortedVideos = filteredVideos.sort((a, b) => {
        const aViews = parseInt(a.statistics?.viewCount, 10);
        const bViews = parseInt(b.statistics?.viewCount, 10);
        return bViews - aViews;
      });

      setVideos(sortedVideos);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchYouTubeVideos();
  };

  useEffect(() => {
    if (query) {
      searchYouTubeVideos();
    }
  }, [query]);

  const handlePlayVideo = (videoId) => {
    setActiveVideo(videoId);
    setShowShareButtons(true);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setShowShareButtons(false);
  };

  const formatCount = (count) => {
    if (count >= 1e9) {
      return (count / 1e9).toFixed(1) + 'B';
    } else if (count >= 1e6) {
      return (count / 1e6).toFixed(1) + 'M';
    } else if (count >= 1e3) {
      return (count / 1e3).toFixed(1) + 'K';
    } else {
      return count;
    }
  };

  const handleCopyLink = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(videoUrl)
      .then(() => alert('Video link copied to clipboard!'))
      .catch((err) => console.error('Failed to copy link:', err));
  };

  const shareOnWhatsApp = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTwitter = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnInstagram = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(videoUrl)}`;
    window.open(instagramUrl, '_blank');
  };

  const screenSize = window.innerWidth;

  return (
    <div className="Video-response">
      <div className="videos-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter prompt for YouTube videos"
            value={prompt}
            onChange={handlePromptChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <span><FaPlayCircle style={{position: 'relative', top:'4px'}} /> EVideos</span>
        <div className="video-list">
          {videos.length > 0 && videos.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <img
                src={video.snippet?.thumbnails?.high?.url}
                alt={video.snippet?.title}
                className="video-thumbnail"
              />
              <button onClick={() => handlePlayVideo(video.id.videoId)} className="play-button">
                ▶️
              </button>
              <div className="video-details">
                <h3>{video.snippet?.title}</h3>
                <p>📈: {formatCount(video.statistics?.viewCount)}</p>
                <p>👍: {formatCount(video.statistics?.likeCount)}</p>
              </div>
            </div>
          ))}
        </div>
        {activeVideo && (
          <>
            <div className="video-overlay" onClick={handleCloseVideo}>
              {screenSize<=1005?(
                <YouTube
  videoId={activeVideo}
  className="video-player-fullscreen"
  opts={{
    height: '250',
    width: '380',
  }}
/>
              ):
              <YouTube
  videoId={activeVideo}
  className="video-player-fullscreen"
  opts={{
    height: '390',
    width: '640',
  }}
/>}
            </div>
            {showShareButtons && (
              <div className="share-buttons-overlay">
                <button onClick={() => handleCopyLink(activeVideo)}><FaLink color="white"/></button>
                <button onClick={() => shareOnWhatsApp(activeVideo)}><FaWhatsapp color="green"/></button>
                <button onClick={() => shareOnTwitter(activeVideo)}><FaTwitter color="blue"/></button>
                <button onClick={() => shareOnInstagram(activeVideo)}><FaInstagram color="pink"/></button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Videos;
