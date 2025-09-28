export enum GameStatus {
    NotStarted,
    CharacterSelection,
    InProgress,
    Finished,
}

export interface Character {
    name: string;
    description: string;
    prompt: string;
    icon: string;
}

export interface GameState {
    status: GameStatus;
    story: string[];
    choices: string[];
    imageUrl: string;
    characterClass: Character | null;
}

export interface GeminiResponse {
    story: string;
    choices: string[];
    imagePrompt: string;
}
