export type Dialog = {
  portrait: string;
  text: string;
  responses: {
    text: string;
    link: string;
  }[];
};

export const dialogs = {
  "0": {
    portrait: "/portrait.png",
    text: "Hello there. May I help you?",
    responses: [
      {
        text: "Hi, tell me about yourself",
        link: "1",
      },
      {
        text: "What skills do you have?",
        link: "2",
      },
      {
        text: "Can I read this in prose instead",
        link: "2",
      },
    ],
  },
  "1": {
    portrait: "/portrait2.png",
    text: "Sure, what do you want to know?",
    responses: [
      {
        text: "What skills do you have?",
        link: "1",
      },
      {
        text: "Strengths and Weaknesses?",
        link: "2",
      },
      {
        text: "Projects and Experience?",
        link: "2",
      },
      {
        text: "Singaporean or PR?",
        link: "2",
      },
    ],
  },
  "2": {
    portrait: "/portrait2.png",
    text: "I have been programming for about 10 years, in several languages. I am most comfortable with TypeScript and Python, since these are the languages used by the companies I have worked in. Most of my work were frontend, and I am familiar with are React and Vue. For backend I am experienced in Node.js. Database solutions I am familiar with are PostgreSQL and Firebase. I have competitive programming experience in C++ and Java as well.",
    responses: [
      {
        text: "That's it? Anything else?",
        link: "2",
      },
      {
        text: "Sounds like a lot",
        link: "1",
      },
      {
        text: "I thought you were a biomedical engineer?",
        link: "2",
      },
    ],
  },
  "3": {
    portrait: "/portrait2.png",
    text: "I have also written a number of scripts for both school projects and for fun. I used Python with the Mediapipe library to do gait analysis for a school project, C++ for several school projects involving Arduino. I also used PyTorch to demonstrate Monte Carlo photon diffusion simulation to my professor and classmates. I have also used VBA for various tasks during my internship at SingHealth.",
    responses: [
      {
        text: "Hmm",
        link: "1",
      },
    ],
  },
  "4": {
    portrait: "/portrait2.png",
    text: "Ah yes, I also do programming. In fact, I started programming a long time before university. I am interested to know how I can apply my programming experience in other fields too. I guess I just like learning?",
    responses: [
      {
        text: "Alright",
        link: "2",
      },
    ],
  },
  "5": {
    portrait: "/portrait2.png",
    text: "Which would you like to hear first?",
    responses: [
      {
        text: "Weaknesses first",
        link: "2",
      },
      {
        text: "Strengths first",
        link: "2",
      },
    ],
  },
  "6": {
    portrait: "/portrait2.png",
    text: "I spend a lot of more time on doing the same quantity of work than other people since I am quite critical of my own work. Even when the ",
    responses: [
      {
        text: "Tell me another",
        link: "2",
      },
      {
        text: "How about your strengths?",
        link: "2",
      },
    ],
  },
} as Record<string, Dialog>;
