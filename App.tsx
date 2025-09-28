import React, { useState, useCallback, useEffect } from 'react';
import { GameState, GameStatus, Character } from './types';
import { CHARACTER_CLASSES } from './constants';
import { generateNextStep } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import ChoiceButton from './components/ChoiceButton';
import StoryDisplay from './components/StoryDisplay';
import CharacterCard from './components/CharacterCard';

const initialGameState: GameState = {
  status: GameStatus.NotStarted,
  story: [],
  choices: [],
  imageUrl: `https://picsum.photos/seed/start/1024/768`,
  characterClass: null,
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startAdventure = useCallback(async (character: Character) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateNextStep([], character.prompt);
      setGameState({
        status: GameStatus.InProgress,
        story: [response.story],
        choices: response.choices,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(response.imagePrompt)}/1024/768`,
        characterClass: character,
      });
    } catch (err) {
      setError('모험을 시작하지 못했습니다. 왕국이 위험에 빠졌습니다! 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChoice = useCallback(async (choice: string) => {
    if (choice.toLowerCase().includes('play again') || choice.includes('다시 플레이')) {
      setGameState(initialGameState);
      return;
    }

    setIsLoading(true);
    setError(null);
    const storyHistory = [...gameState.story];

    try {
      const response = await generateNextStep(storyHistory, choice);
      setGameState(prevState => ({
        ...prevState,
        status: GameStatus.InProgress,
        story: [...prevState.story, response.story],
        choices: response.choices,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(response.imagePrompt)}/1024/768`,
      }));
    } catch (err)
 {
      setError('신비로운 힘이 당신의 운명에 개입했습니다. 다른 선택을 해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [gameState.story]);

  const renderContent = () => {
    switch (gameState.status) {
      case GameStatus.NotStarted:
        return (
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
            <img src={`https://picsum.photos/seed/title/1024/768`} alt="중세 풍경" className="rounded-lg mb-8 shadow-lg w-full max-w-md" />
            <h2 className="text-3xl font-cinzel text-amber-100 mb-4">아직 쓰이지 않은 연대기.</h2>
            <p className="max-w-prose text-amber-200 mb-8 leading-relaxed">
              당신은 신화와 그림자의 땅, 새로운 이야기의 벼랑 끝에 서 있습니다. 모든 선택은 이 어두운 판타지 세계를 통과하는 길을 개척합니다. 영광, 재산, 또는 단순한 생존 중 무엇을 추구하시겠습니까?
            </p>
            <button
              onClick={() => setGameState(prev => ({ ...prev, status: GameStatus.CharacterSelection }))}
              className="font-cinzel bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-lg hover:shadow-yellow-300/50 text-xl tracking-wider"
            >
              모험 시작하기
            </button>
          </div>
        );
      case GameStatus.CharacterSelection:
        return (
            <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-4xl font-cinzel text-amber-100 mb-2">영웅을 선택하세요</h2>
                <p className="max-w-prose text-amber-200 mb-8">당신의 정체성이 앞으로 걸어갈 길을 결정합니다.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {CHARACTER_CLASSES.map(character => (
                        <CharacterCard 
                            key={character.name} 
                            character={character} 
                            onSelect={() => startAdventure(character)}
                            disabled={isLoading}
                        />
                    ))}
                </div>
                {isLoading && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <LoadingSpinner />
                        <p className="mt-4 text-amber-200 text-lg font-cinzel">운명을 빚어내는 중...</p>
                    </div>
                )}
            </div>
        );
      case GameStatus.InProgress:
        return (
          <>
            <div className="relative">
              <StoryDisplay
                imageUrl={gameState.imageUrl}
                storyText={gameState.story[gameState.story.length - 1]}
                isLoading={isLoading}
              />
              {isLoading && (
                 <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center z-10 rounded-lg">
                    <LoadingSpinner />
                    <p className="mt-4 text-amber-200 text-lg font-cinzel">운명의 실이 엮이는 중...</p>
                </div>
              )}
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.choices.map((choice, index) => (
                  <ChoiceButton
                    key={index}
                    text={choice}
                    onClick={() => handleChoice(choice)}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-slate-900 min-h-screen text-amber-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-300 tracking-wider" style={{ textShadow: '0 0 10px #fde047, 0 0 20px #fde047' }}>
            중세 텍스트 RPG
          </h1>
          <p className="text-amber-200 mt-2 text-lg">{gameState.characterClass?.name || '당신의 전설이 기다립니다'}</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm border border-yellow-300/20 rounded-lg shadow-2xl shadow-yellow-500/10 p-4 sm:p-8">
          {renderContent()}
          {error && <p className="text-red-400 mt-4 text-center bg-red-900/50 border border-red-500 p-3 rounded-md">{error}</p>}
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Gemini. 디지털 대장간에서 만들어진 모험.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;