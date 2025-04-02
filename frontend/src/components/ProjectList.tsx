import { useState, useEffect, SetStateAction } from "react";
import { Project } from "../types/Project";
// import CookieConsent from "react-cookie-consent";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsApi";
import './ProjectList.css';
import Pagination from "./Pagination";


function ProjectList({selectedCategories}: {selectedCategories: string[]}) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
           
            try {
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories)
           

                
                if (data && data.projects) {
                    setProjects(data.projects);
                    setTotalItems(data.totalNumProjects || 0);
                    setTotalPages(Math.ceil((data.totalNumProjects || 0) / pageSize));
                } else {
                    console.error("Unexpected API structure:", data);
                    setProjects([]); // Set empty if unexpected structure
                }
            } catch (error) {
                setError((error as Error).message);

            } finally {
                setLoading(false);
            };
        };
    
        loadProjects();
    }, [pageSize, pageNum, totalItems, selectedCategories]);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className='text-red-500'>Error: {error}</p>;

    return (
        <div className="container">
            <h1 className="heading">Water Projects</h1>
            <br />
    
            {/* Page size dropdown */}

    
            {loading && <p className="loading">Loading projects...</p>}
            {error && <p className="error">{error}</p>}
    
            {projects && projects.length > 0 ? (
                <>
                    {projects.map((p) => (
                        <div key={p.projectId} className="projectCard">
                            <h3 className="cardTitle">{p.projectName}</h3>
                            <ul className="projectDetails">
                                <li><strong>Project Type:</strong> {p.projectType}</li>
                                <li><strong>Regional Program:</strong> {p.projectRegionalProgram}</li>
                                <li><strong>Impact:</strong> {p.projectImpact} People Served</li>
                                <li><strong>Project Phase:</strong> {p.projectPhase}</li>
                                <li><strong>Project Status:</strong> {p.projectFunctionalityStatus}</li>
                            </ul>
                            <button className='btn btn-success' onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}>Donate</button>
                        </div>
                    ))}
    
                    {/* Pagination Controls */}
                    <Pagination 
                        currentPage={pageNum}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        onPageChange={setPageNum}
                        onPageSizeChange={(newSize: SetStateAction<number>) => {
                            setPageSize(newSize);
                            setPageNum(1);
                        }}
                        />

                </>
            ) : (
                !loading && <p className="noProjects">No projects found.</p>
            )}
        </div>
    );
    



};

export default ProjectList;
