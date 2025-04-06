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
    text: "Question 0",
    responses: [
      {
        text: "Response 0",
        link: "1",
      },
      {
        text: "Response 1",
        link: "2",
      },
      {
        text: "Response 2",
        link: "2",
      },
    ],
  },
  "1": {
    portrait: "/portrait2.png",
    text: "Question 1",
    responses: [
      {
        text: "question 1 response 0",
        link: "1",
      },
      {
        text: "question 1 response 1",
        link: "2",
      },
    ],
  },
  "2": {
    portrait: "/portrait2.png",
    text: "Question 2",
    responses: [
      {
        text: "question 2 response 0",
        link: "1",
      },
      {
        text: "question 2 response 1",
        link: "2",
      },
    ],
  },
} as Record<string, Dialog>;
