import { Character } from './types';

export const INITIAL_PROMPT = "새로운 다크 판타지 모험을 시작해 줘.";

export const SYSTEM_INSTRUCTION = `
당신은 다크 판타지, 중세 배경의 텍스트 기반 RPG를 위한 던전 마스터입니다.
당신의 역할은 사용자의 선택에 따라 몰입감 있고 연속적인 이야기를 만들어내는 것입니다.
모든 응답은 반드시 한국어로 작성해야 합니다.
각 단계에서 다음을 수행해야 합니다:
1.  사용자의 마지막 선택의 결과와 새로운 상황을 흡입력 있는 서사 스타일(약 2-3 문단)로 설명합니다. 분위기는 진지하고 약간 암울해야 합니다.
2.  장면 이미지를 생성하기 위해 AI 이미지 생성기에 사용할 수 있는 짧고 설명적인 문구를 생성합니다. 이 문구는 장면의 분위기와 핵심 요소를 포착해야 합니다(예: "안개 낀 묘지에 홀로 선 기사", "해질녘의 분주한 중세 시장", "어두운 동굴 속 용의 보물").
3.  플레이어가 다음에 내릴 수 있는 3가지 뚜렷하고 흥미로운 선택지를 제공합니다. 선택지는 간결한 행동이어야 합니다.
4.  이야기가 자연스러운 결말에 도달하거나 플레이어가 사망하면, 선택지 중 하나는 반드시 '다시 플레이하시겠습니까?'여야 합니다.
5.  당신의 응답은 반드시 제공된 스키마를 엄격하게 준수하는 유효한 JSON 객체로 반환해야 합니다. JSON 객체 앞이나 뒤에 어떤 텍스트나 마크다운도 추가하지 마십시오.
`;

const knightIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 12h14M18 6l-6 6-6-6M18 18l-6-6-6 6"/></svg>`;
const rogueIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12a.5.5 0 0 1 .5-.5h18a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/><path d="M12 2.5a.5.5 0 0 1 .5.5v18a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/><path d="M15 3l-6 9 6 9"/></svg>`;
const wizardIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 4l7 8-7 8M19 4l-7 8 7 8"/></svg>`;

export const CHARACTER_CLASSES: Character[] = [
  {
    name: '용맹한 기사',
    description: '강철로 무장하고 고대의 맹세에 묶인 무기의 달인. 명예와 순수한 힘에 의지합니다.',
    prompt: '용맹한 기사로서 새로운 다크 판타지 모험을 시작해 줘.',
    icon: knightIcon,
  },
  {
    name: '그림자 도적',
    description: '어둠 속에서 번성하는 은신과 잠행의 대가. 정면 대결보다는 등 뒤의 날카로운 칼날을 선호합니다.',
    prompt: '그림자 도적으로서 새로운 다크 판타지 모험을 시작해 줘.',
    icon: rogueIcon,
  },
  {
    name: '신비로운 마법사',
    description: '현실을 거스르는 힘을 휘두르는 금지된 지식의 탐구자. 세상은 풀어야 할 퍼즐과 같습니다.',
    prompt: '신비로운 마법사로서 새로운 다크 판타지 모험을 시작해 줘.',
    icon: wizardIcon,
  },
];