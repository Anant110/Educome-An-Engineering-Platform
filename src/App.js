import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Vision from './Components/Welcome/Pages/Vision-Page/Vision';
import Features from './Components/Welcome/Pages/Featues-Page/Features';
import HowWork from './Components/Welcome/Pages/How-Work-Page/HowWork';
import Profile from './UserProfile/Profile/Profile';
import { AuthProvider } from './Components/Context/AuthProvider';
import Categories from './Categories/Categories';
import PopupForm from './Categories/PopopForm';
import SelfLearn from './Pages/SelfLearnign/SelfLearn';
import WebResponses from './Pages/ChatBot/Queries/Results/Web/WebResponses';
import Gemini from './Pages/ChatBot/Queries/Results/Ai/Gemini';
import Result from './Pages/ChatBot/Queries/Results/Result';
import Videos from './Pages/ChatBot/Queries/Results/Video/Videos';
import Books from './Pages/Books/Books';
import GitHubProfile from './Pages/Socials/GitHub/GitHubProfile';
import Mate from './Pages/Socials/FindMate/Mate';
import ChatRoom from '../src/Categories/ChatRoom';
import Testimonials from './Components/Welcome/Pages/Working-Features/Testemonials/Testemonials';
import Developers from './Components/Welcome/Pages/Working-Features/Developers/Developers';
import Compare from './Components/Welcome/Pages/Working-Features/Compare/Compare';
import Footer from './Components/Welcome/Pages/Footer-Page/Footer';
import Projects from './Pages/Projects/Projects';
import FAQ from './Components/Welcome/Pages/Working-Features/FAQ/FAQ';
import useSmoothScroll from './useSmoothScroll';
import LeaderBoard from './Components/Welcome/Pages/Working-Features/LearderBoard/LeaderBoard';
import Feedback from './Components/Welcome/Feedback/Feedback';
import CoverLetterGenerator from './Pages/CoverLetter/CoverLetterGenerator';
import Community from './Pages/Community/Community';
import Chatbot from './Components/IBM_Service/Chatbot';
import ServerError from './Pages/ServerError/ServerError';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/pacifics-path" element={
            <>
              <Vision />
              <Features />
              <Testimonials />
              <Developers />
              <FAQ />
              {/* <Feedback /> */}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watson-bot" element={<Chatbot />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/selfLearn" element={<SelfLearn />} />
          <Route path="/self-learn/response" element={<Result />} />
          <Route path="/self-learn/response/Videos" element={<Videos />} />
          <Route path="/read-books" element={<Books />} />
          <Route path="/github-profile" element={<GitHubProfile />} />
          <Route path="/git-mate" element={<Mate />} />
          <Route path="/chat/:topic" element={<ChatRoom />} />
          <Route path="/Compare" element={<Compare />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/learderboard" element={<LeaderBoard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator />} />
          <Route path="/join-community" element={<Community />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
    
    // <ServerError />
  );
}

export default App;
