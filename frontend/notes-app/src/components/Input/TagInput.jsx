import React, { useState } from 'react';
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-black bg-gray-200 px-3 py-1 rounded-full"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-black hover:text-gray-600 transition duration-200"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200"
          onClick={addNewTag}
        >
          <MdAdd className="text-xl text-black hover:text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
