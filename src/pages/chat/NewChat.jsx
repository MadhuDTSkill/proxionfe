import React, { useEffect, useState } from "react";
import categories from "../../assets/data/categories.json";
import Header from "../../Components/RootLayout/Header";
import Categories from "../../Components/NewChat/Categories";
import Topics from "../../Components/NewChat/Topics";

const NewChat = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [currentTopics, setCurrentTopics] = useState([]);

  useEffect(() => {
    const currentTopics = categories.find((category) => category.name === selectedCategory).topics;
    setCurrentTopics(currentTopics);
  }, [selectedCategory]);

  return (
    <div className='flex flex-col h-full space-y-2'>
      <Header />
      <div className="flex-1 overflow-auto flex items-center justify-between space-x-2">
        <Topics selectedCategory={selectedCategory} currentTopics={currentTopics} />
        <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
    </div>
  );
};

export default NewChat;
