import CookieConsent from "react-cookie-consent";
import FingerPrint from "../components/FingerPrint";
import ProjectList from "../components/ProjectList";
import CategoryFilter from "../components/CategoryFilter";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

function ProjectsPage () {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <>
      <div className="container my-4">
        <CartSummary />
        <div className="row">
          {/* Sidebar - 1/3 width */}
          <div className="col-md-4 col-lg-4 mb-4">
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>

          {/* Main content - 2/3 width */}
          <div className="col-md-8 col-lg-8">
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>

      <CookieConsent>
        This website uses cookies to improve the user experience
      </CookieConsent>
      <FingerPrint />
        </>
    )
}

export default ProjectsPage;