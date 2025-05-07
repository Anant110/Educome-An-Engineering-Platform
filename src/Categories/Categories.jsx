import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import { useEffect } from 'react';
import { Scrollreveal } from "../Components/Animations/Scrollreveal";
import { gsapAnimations } from "../Components/Animations/Gsap";
import PopupForm from './PopopForm';

function Categories() {

    const [form, setForm] = useState(false);
    const [category,setCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Scrollreveal();
    }, []);

    function toggleForm(category) {
        setCategory(category); 
        setForm(!form);
    }

    function onClose() {
        setForm(false);
    }

    const categories = [
        "Physics", "Math", "Chemistry", "Biology", "History",
        "Geography", "Literature", "Music", "Art", "Sport",
        "Cinema", "Theatre", "TV", "Video Games", "Comics",
        "Manga", "Anime", "Fashion", "Cooking", "DIY",
        "Travel", "Photography", "Science", "Technology",
        "Programming", "Languages"
    ];

    const colors = ["#FFC312", "#C4E538", "#12CBC4", "#FDA7DF", "#ED4C67",
        "#F79F1F", "#A3CB38", "#1289A7", "#D980FA", "#B53471",
        "#EE5A24", "#009432", "#0652DD", "#9980FA", "#833471",
        "#EA2027", "#006266", "#1B1464", "#5758BB", "#6F1E51",
        "#B33939", "#4CD137", "#487EB0", "#0097E6", "#8C7AE6",
        "#44BD32", "#40739e"
    ]

    return (
        <div className="Categories-container">
            <div className="category-head">
                <h1>Choose what excites you</h1>
                <img className="checklist" src="./Icons/checklist.png" alt="" />
            </div>
            <div className={`categories-body ${form ? 'form-open' : ''}`}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category ${category.replace(/\s/g, '')}`}
                        style={{ backgroundColor: colors[index] }} // Set background color dynamically
                        onClick={() => toggleForm(category)} // Corrected onClick event handler
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="form-container">
                {form && <PopupForm onClose={onClose} category={category} />}
            </div>
        </div>
    );
}

export default Categories;
