import React, { useState } from 'react';
import { MdHelpOutline } from 'react-icons/md';

const StoryPrompt = () => {
  const [prompt, setPrompt] = useState("Click '?' to get a story idea...");

  const prompts = [
    "Write a story about a time traveler who gets stuck in the future.",
    "Imagine a world where everyone can read each other's thoughts.",
    "Describe the adventures of a talking cat on a pirate ship.",
    "What happens when a young witch loses their powers?",
    "Write about an inventor whose creation goes horribly wrong.",
  ];

  const generateRandomPrompt = () => {
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(newPrompt);
  };

  return (
    <div className="flex items-center gap-2">
      {/* "?" Button to generate a new prompt */}
      <button
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={generateRandomPrompt}
      >
        <MdHelpOutline className="text-xl" />
      </button>

      {/* Display current prompt */}
      <div className="text-lg font-medium">{prompt}</div>
    </div>
  );
};

export default StoryPrompt;
