import { useEffect, useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter({selectedCategories, setSelectedCategories}:
    {   selectedCategories: string[];
        setSelectedCategories: (categories: string[]) => void}) {
    const [categories, setCategories] = useState<string[]>([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:5001/Water/GetProjectTypes');
                const data = await response.json();
                console.log("Fetched data: ", data);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    function handleCheckBoxChange ({target}: {target: HTMLInputElement})
    {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter">
          <h5>Project Types</h5>
          <div>
            {categories.map((c) => (
              <div className="checkbox-item" key={c}>
                <input 
                type="checkbox" id={c} value={c}
                onChange={handleCheckBoxChange} />


                <label htmlFor={c} className="category-text">{c}</label>
              </div>
            ))}
          </div>
        </div>
      );
      
}

export default CategoryFilter;
