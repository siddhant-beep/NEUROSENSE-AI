import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { TypingInputScreen } from "./components/TypingInputScreen";
import { AnalysisResultsScreen } from "./components/AnalysisResultsScreen";
import { ProfileHistoryScreen } from "./components/ProfileHistoryScreen";

type Screen = "home" | "input" | "results" | "history";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomePage
            onStartAnalysis={() => setCurrentScreen("input")}
          />
        );

      case "input":
        return (
          <TypingInputScreen
            onBack={() => setCurrentScreen("home")}
            onSubmitAnalysis={() => setCurrentScreen("results")}
          />
        );

      case "results":
        return (
          <AnalysisResultsScreen
            onBack={() => setCurrentScreen("input")}
            onRetest={() => setCurrentScreen("input")}
            onViewHistory={() => setCurrentScreen("history")}
          />
        );

      case "history":
        return (
          <ProfileHistoryScreen
            onBack={() => setCurrentScreen("results")}
            onStartNewTest={() => setCurrentScreen("input")}
          />
        );

      default:
        return (
          <HomePage
            onStartAnalysis={() => setCurrentScreen("input")}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
}