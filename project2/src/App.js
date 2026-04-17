import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LessonContent from "./components/LessonContent";
import GamificationPanel from "./components/GamificationPanel";
import "./components/EdTech.css";

function App() {
  const [currentLesson, setCurrentLesson] = useState(3);

  const userStats = {
    level: 4,
    xp: 640,
    streak: 12,
    badges: 6,
    points: 2480
  };

  const recentAchievements = [
    { title: "Completed Arrays & Objects", date: "Hôm nay", points: 120 },
    { title: "7-day streak milestone", date: "2 ngày trước", points: 80 },
    { title: "First perfect quiz", date: "3 ngày trước", points: 150 }
  ];

  return (
    <div className="edtech-container">
      <Sidebar currentLesson={currentLesson} onLessonSelect={setCurrentLesson} />
      <div className="edtech-main">
        <Header userStats={userStats} />
        <LessonContent lessonId={currentLesson} />
      </div>
      <GamificationPanel userStats={userStats} recentAchievements={recentAchievements} />
    </div>
  );
}

export default App;
