import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function DonatePage() {
    const navigate = useNavigate();
    const { projectName, projectId } = useParams();
    const { addtoCart } = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId),
            projectName: projectName ?? "No project found",
            donationAmount: donationAmount
        };
        addtoCart(newItem);
        navigate('/cart');
    }; 

    return (
        <>
            <h2>Donate to {projectName}</h2>

            <div>
                <input
                    type="number"
                    placeholder="Enter donation amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go back</button>
        </>
    );
}

export default DonatePage;
