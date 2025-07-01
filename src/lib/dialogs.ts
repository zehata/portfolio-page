export type Dialog = {
  text: string;
  responses: {
    text: string;
    link: keyof typeof dialogs;
  }[];
};

export const dialogs: Record<string, Dialog> = {
  hello: {
    text: "Hello there. May I help you?",
    responses: [
      {
        text: "Hi, tell me about yourself",
        link: "me-1",
      },
      {
        text: "What skills do you have?",
        link: "skills-1",
      },
      {
        text: "Can I read this in prose instead",
        link: "https://boring.zehata.dev",
      },
    ],
  },
  "me-1": {
    text: "Sure, what do you want to know?",
    responses: [
      {
        text: "What skills do you have?",
        link: "skills-1",
      },
      {
        text: "Weaknesses and Strengths?",
        link: "weaknesses-and-strengths",
      },
      {
        text: "Projects and Experience?",
        link: "projects-and-experience",
      },
      {
        text: "Something else...",
        link: "me-2",
      },
    ],
  },
  "me-2": {
    text: "Sure, what do you want to know?",
    responses: [
      {
        text: "Describe yourself in 3 to 5 words?",
        link: "3-to-5-words",
      },
      {
        text: "How can I contact you?",
        link: "contact",
      },
      {
        text: "How do you deal with stressful situations?",
        link: "stressful-situations",
      },
      {
        text: "Something else...",
        link: "me-3",
      },
    ],
  },
  "me-3": {
    text: "Sure, what do you want to know?",
    responses: [
      {
        text: "Do you work better alone or as a team?",
        link: "alone-or-team",
      },
      {
        text: "Where do you see yourself in 5 years?",
        link: "in-5-years",
      },
      {
        text: "Singaporean or PR?",
        link: "singaporean-or-pr",
      },
      {
        text: "There was a question just now...",
        link: "me-1",
      },
    ],
  },
  "skills-1": {
    text: "I have been programming for about 10 years, in several languages. I am most comfortable with TypeScript and Python, since these are the languages used by the companies I have worked in. Most of my work were frontend, and I am familiar with are React and Vue.",
    responses: [
      {
        text: "Mhmm",
        link: "skills-1-2",
      },
    ],
  },
  "skills-1-2": {
    text: "For backend I am experienced in Node.js. Database solutions I am familiar with are PostgreSQL and Firebase. I have competitive programming experience in C++ and Java as well.",
    responses: [
      {
        text: "That's it? Anything else?",
        link: "skills-2",
      },
      {
        text: "Sounds like a lot",
        link: "skills-2",
      },
    ],
  },
  "skills-2": {
    text: "I also used PyTorch to demonstrate Monte Carlo photon diffusion simulation to my professor and classmates. I have also used VBA for various tasks during my internship at SingHealth.",
    responses: [
      {
        text: "Ok",
        link: "skills-2-2",
      },
    ],
  },
  "skills-2-2": {
    text: "I also used PyTorch to demonstrate Monte Carlo photon diffusion simulation to my professor and classmates. I have also used VBA for various tasks during my internship at SingHealth.",
    responses: [
      {
        text: "Hmm",
        link: "me-1",
      },
    ],
  },
  "surprise-pikachu": {
    text: "Ah yes, sorry. Actually I also do software engineering. In fact, I started programming a long time before university. I took biomedical engineering because I am interested to know how I can apply my programming experience in other fields too. I guess I just like learning?",
    responses: [
      {
        text: "Alright",
        link: "me-1",
      },
    ],
  },
  "weaknesses-and-strengths": {
    text: "Which would you like to hear first?",
    responses: [
      {
        text: "Weaknesses first",
        link: "weakness-1",
      },
      {
        text: "Strengths first",
        link: "strength-1",
      },
    ],
  },
  "weakness-1": {
    text: "I spend a lot of more time on doing the same quantity of work than other people since I am quite critical of my own work. Even when things work correctly, I would spend more time to polish it up, for both users and my teammates. I am less critical of other people's work though, and I prefer to learn from all the things that they are doing better than me, but really low-effort shoddy products would get me worked up.",
    responses: [
      {
        text: "Tell me another",
        link: "weakness-2",
      },
      {
        text: "How about your strengths?",
        link: "strength-1",
      },
    ],
  },
  "weakness-2": {
    text: "I can be quite careless at times, particularly when I am swamped with tasks. To avoid this I would use automated testing tools like regviz to ensure that I did not introduce any unintended changes. These mistakes stick with me forever and I make sure that they never happen again.",
    responses: [
      {
        text: "One last one",
        link: "weakness-3",
      },
      {
        text: "How about your strengths?",
        link: "strength-1",
      },
    ],
  },
  "weakness-3": {
    text: "I really hate it when there's nothing that I can work on, like when I have finished my work and is waiting for my code to be reviewed, and so I tend to bite off more than I can chew. I try to be as helpful as possible, so when there's nothing that I can worrk at the moment I want to to take on more things, and that can lead to me having to much to do at once.",
    responses: [
      {
        text: "How about your strengths?",
        link: "strength-1",
      },
    ],
  },
  "weakness-4": {
    text: "Bullets. I am weak to bullets. Seriously, why do you have so little confidence in me that you would change the url manually to try to get to more? Besides, are you even considering a person if everything you can see in them are flaws?",
    responses: [],
  },
  "strength-1": {
    text: "Some of my friends say that I am very hardworking, but it's actually because I become genuinely interested in things I do. I take pride in my own work. I'm constantly aware of the genuine positive impact that my work can have on other people. I often spend a lot of time outside work thinking about my tasks, about the entire project in general and thinking about how I can improve the experience for users.",
    responses: [
      {
        text: "Tell me another",
        link: "strength-2",
      },
      {
        text: "How about your weaknesses?",
        link: "weakness-1",
      },
    ],
  },
  "strength-2": {
    text: "I am a very resourceful and flexible person. It means that I am good at working with restrictions, and I really enjoy challenges, since they force me to come up with innovative solutions to work around problems. However, I don't compromise when it comes to the experience of the users.",
    responses: [
      {
        text: "Tell me another",
        link: "strength-3",
      },
      {
        text: "How about your weaknesses?",
        link: "weakness-1",
      },
    ],
  },
  "strength-3": {
    text: "I am a team player. There are often times chores that need to be done, that which will not look very flashy on my resume, but someone has to do them so I will just volunteer to take one for the team.",
    responses: [
      {
        text: "How about your weaknesses?",
        link: "weakness-1",
      },
      {
        text: "I want to know something else",
        link: "me-1",
      },
    ],
  },
  "projects-and-experience": {
    text: "I have written a number of projects and about 3.5 years of internship experience working in technical roles. You can read the briefs on these projects on this site, and you can also find some of my thoughts over at dev blogs.",
    responses: [
      {
        text: "I see",
        link: "me-1",
      },
      {
        text: "Link me there",
        link: "/projects",
      },
    ],
  },
  "3-to-5-words": {
    text: "Analytic, resourceful, curious, tactful",
    responses: [
      {
        text: "I see",
        link: "me-2",
      },
    ],
  },
  contact: {
    text: "You can visit the contact page to see the different ways you can contact me.",
    responses: [
      {
        text: "I see",
        link: "me-2",
      },
      {
        text: "Link me there",
        link: "/contact",
      },
    ],
  },
  "stressful-situations": {
    text: "Stress gives me adrenaline. When there is a critical issue or a deadline, I become hyper focused on the task, and I would work forget the time, and eating, etc. I would prefer otherwise though, it is not exactly healthy.",
    responses: [
      {
        text: "I see",
        link: "me-2",
      },
    ],
  },
  "alone-or-team": {
    text: "In a team. Even when I am working on my own task I quite enjoy the company and the healthy peer pressure to keep me focused.",
    responses: [
      {
        text: "I see",
        link: "me-2",
      },
    ],
  },
  "in-5-years": {
    text: "I am planning to save up my income for postgraduate education, if possible I would like to pursue a master's degree in 5 years.",
    responses: [
      {
        text: "I see",
        link: "me-2",
      },
    ],
  },
  "singaporean-or-pr": {
    text: "I have been living in Singapore for about 15 years. I am exempted from minimum Employment Pass wages requirement by MOM, having studied under MOE Tuition Grant and thus required to work in Singapore.",
    responses: [
      {
        text: "That sounds too good to be true",
        link: "ep-letter-deadline",
      },
    ],
  },
  "ep-letter-deadline": {
    text: "The catch is that you have to make up your mind by September. If I am hired before then, you can be sure that my EP application will be successful without salary restrictions, but because MOM is only recognizing this letter until then, you will have to offer me a significantly higher salary to sponsor my Employment Pass.",
    responses: [
      {
        text: "I see",
        link: "me-3",
      },
    ],
  },
} as const satisfies Record<string, Dialog>;
