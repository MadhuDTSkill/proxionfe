import React from "react";
import Card from "../../Components/ui/Card";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="h-full flex flex-col space-y-2 border border-gray-700 p-4 flex-1">
            <h1 className="text-sm text-right font-semibold">Categories</h1>
            <div className="flex flex-col space-y-2">
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        extraClassName={`${selectedCategory === category.name ? "border-main scale-[1.02]" : ""}`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <div
                            className={`w-full cursor-pointer flex flex-col justify-center items-center transition-all`}
                        >
                            <span className="text-sm">{category.name}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Categories;
