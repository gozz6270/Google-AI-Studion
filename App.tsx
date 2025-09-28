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
      setError('Failed to start the adventure. The realm is in peril—please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChoice = useCallback(async (choice: string) => {
    if (choice.toLowerCase().includes('play again')) {
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
    } catch (err) {
      setError('Mystic forces have intervened in your fate. Please choose a different path.');
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
            <img src={`https://picsum.photos/seed/title/1024/768`} alt="Medieval landscape" className="rounded-lg mb-8 shadow-lg w-full max-w-md" />
            <h2 className="text-3xl font-cinzel text-amber-100 mb-4">A chronicle yet unwritten.</h2>
            <p className="max-w-prose text-amber-200 mb-8 leading-relaxed">
              You stand at the brink of a new tale in a land of myth and shadow. Every choice will carve a path through this dark fantasy realm. Will you seek glory, riches, or simple survival?
            </p>
            <button
              onClick={() => setGameState(prev => ({ ...prev, status: GameStatus.CharacterSelection }))}
              className="font-cinzel bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-md hover:bg-yellow-300 transition-all duration-300 ease-in-out shadow-lg hover:shadow-yellow-300/50 text-xl tracking-wider"
            >
              Begin your quest
            </button>
          </div>
        );
      case GameStatus.CharacterSelection:
        return (
            <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-4xl font-cinzel text-amber-100 mb-2">Choose your hero</h2>
                <p className="max-w-prose text-amber-200 mb-8">The identity you claim will shape the road ahead.</p>
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
                        <p className="mt-4 text-amber-200 text-lg font-cinzel">Forging destiny...</p>
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
                    <p className="mt-4 text-amber-200 text-lg font-cinzel">Weaving the threads of fate...</p>
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
            Medieval Text RPG
          </h1>
          <p className="text-amber-200 mt-2 text-lg">{gameState.characterClass?.name || 'Your legend awaits'}</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm border border-yellow-300/20 rounded-lg shadow-2xl shadow-yellow-500/10 p-4 sm:p-8">
          {renderContent()}
          {error && <p className="text-red-400 mt-4 text-center bg-red-900/50 border border-red-500 p-3 rounded-md">{error}</p>}
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Gemini. An adventure forged in the digital foundry.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;