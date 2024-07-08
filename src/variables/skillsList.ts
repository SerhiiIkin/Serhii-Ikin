import type { skillsListGroupType } from '@modules/skillsListGroupType';

export const skillsListGoup: skillsListGroupType[] = [
  {
    title: 'Front-End Development',
    list: [
      {
        b: 'Frameworks:',
        li: ['React', 'Next.js', 'Angular', 'Vue', 'Blazor'],
      },
      {
        b: 'Styling:',
        li: ['Tailwind CSS', 'Bootstrap', 'Scss', 'Css'],
      },
      {
        b: 'State Management:',
        li: ['Redux/Toolkit', 'Zustand'],
      },
    ],
  },
  {
    title: 'Back-End Development',
    list: [
      {
        b: '',
        li: ['Node.js', 'C#'],
      },
      {
        b: 'Database:',
        li: ['MongoDB'],
      },
    ],
  },
  {
    title: 'Tools and Technologies',
    list: [
      {
        b: 'Containerization:',
        li: ['Docker'],
      },
      {
        b: 'Design:',
        li: ['Figma'],
      },
      {
        b: '',
        li: ['Typescript'],
      },
    ],
  },
];
