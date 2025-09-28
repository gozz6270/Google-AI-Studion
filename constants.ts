import { Character } from './types';

export const INITIAL_PROMPT = 'Begin a new dark fantasy adventure.';

export const SYSTEM_INSTRUCTION = `
You are the dungeon master for a dark fantasy, medieval-themed text RPG.
Your role is to craft immersive, continuous storytelling that responds to the player's choices.
All responses must be written in English.
At each step you must:
1.  Describe the outcome of the player's last choice and the new situation in an evocative narrative style (about 2-3 paragraphs). The tone should be serious and slightly grim.
2.  Produce a short, descriptive phrase that could be used with an AI image generator to depict the scene. The phrase should capture the atmosphere and key elements of the moment (e.g., "Knight standing alone in a foggy graveyard", "Bustling medieval market at sunset", "Dragon's hoard in a shadowy cavern").
3.  Provide 3 distinct and compelling choices for what the player can do next. The choices should be concise actions.
4.  When the story reaches a natural conclusion or the player dies, one of the options must be "Play again?".
5.  Return your response as a valid JSON object that strictly follows the provided schema. Do not add any text or markdown before or after the JSON object.
`;

const knightIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 12h14M18 6l-6 6-6-6M18 18l-6-6-6 6"/></svg>`;
const rogueIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12a.5.5 0 0 1 .5-.5h18a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/><path d="M12 2.5a.5.5 0 0 1 .5.5v18a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/><path d="M15 3l-6 9 6 9"/></svg>`;
const wizardIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 4l7 8-7 8M19 4l-7 8 7 8"/></svg>`;
const barbarianIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l6 6"/><path d="M20 4l-6 6"/><path d="M12 10l0 11"/><path d="M7 21h10"/><path d="M9 3l3 3 3-3"/></svg>`;

export const CHARACTER_CLASSES: Character[] = [
  {
    name: 'Valiant Knight',
    description:
      'A master of arms clad in steel and bound by ancient oaths. You rely on honor and sheer strength.',
    prompt: 'Begin a new dark fantasy adventure as the valiant knight.',
    icon: knightIcon,
  },
  {
    name: 'Shadow Rogue',
    description:
      'A master of stealth and subterfuge who thrives in darkness. You prefer a dagger in the back to a frontal assault.',
    prompt: 'Begin a new dark fantasy adventure as the shadow rogue.',
    icon: rogueIcon,
  },
  {
    name: 'Arcane Sorcerer',
    description:
      'A seeker of forbidden knowledge wielding power that defies reality. The world is a puzzle to be solved.',
    prompt: 'Begin a new dark fantasy adventure as the arcane sorcerer.',
    icon: wizardIcon,
  },
  {
    name: 'Feral Barbarian',
    description:
      'A vanguard of destruction driven by pounding fury and primal might. You roar for victory amid blood and steel.',
    prompt: 'Begin a new dark fantasy adventure as the feral barbarian.',
    icon: barbarianIcon,
  },
];
