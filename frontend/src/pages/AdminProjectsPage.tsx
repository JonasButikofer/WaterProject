import { useEffect, useState } from "react";
import { Project } from "../types/Project";
import { deleteProject, fetchProjects } from "../api/ProjectsApi";
import Pagination from "../components/Pagination";
import NewProjectForm from "../components/NewProjectForm";
import EditProjectForm from "../components/EditProjectForm";

const AdminProjectsPage = () => {
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState(true);
        const [projects, setProjects] = useState<Project[]>([]);
        const [pageSize, setPageSize] = useState<number>(10);
        const [pageNum, setPageNum] = useState<number>(1);
        const [totalPages, setTotalPages] = useState<number>(0);
        const [showForm, setShowForm] = useState(false);
        const [editingProject, setEditingProject] = useState<Project | null>(null);



useEffect(() => {
    const loadProjects = async () => {
        try {
            const data = await fetchProjects(pageSize, pageNum, []);
            setProjects(data.projects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize))
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    
    };

    loadProjects();
}, [pageSize, pageNum]) // this triggers the useEffect to tell it when to go fetch again

const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm('Delete project?');
    if (!confirmDelete) return;

    try {
        await deleteProject(projectId);
        setProjects(projects.filter((p) => p.projectId !== projectId));
    
    } catch (error) {
        alert('Failed to delete project');

    } throw error 
};

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <div>
            <h1>Admin - Projects</h1>

            {!showForm && (
                <button className="btn btn-success mb-3"
                onClick={() => setShowForm(true)}>Add Project</button>
            )}

            {showForm && (
            <NewProjectForm 
                onSucess={() => {
                    setShowForm(false);
                    fetchProjects(pageSize, pageNum, []).then(data => setProjects(data.projects));
                }}
                onCancel={() => setShowForm(false)}
            />
        )}

        {editingProject && (
            <EditProjectForm project={editingProject} onSucess={() => {
                setEditingProject(null);
                fetchProjects(pageSize, pageNum, []).then((data) => setProjects(data.projects));
            }}
            onCancel={() => setEditingProject(null)}
            />
        )}


            <table className="table table-bordered table-stripped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>REgional Program</th>
                        <th>Impact</th>
                        <th>Phase</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((p) => (
                            <tr key={p.projectId}>
                                <td>{p.projectId}</td>
                                <td>{p.projectName}</td>
                                <td>{p.projectType}</td>
                                <td>{p.projectRegionalProgram}</td>
                                <td>{p.projectImpact}</td>
                                <td>{p.projectPhase}</td>
                                <td>{p.projectFunctionalityStatus}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingProject(p)}>Edit</button>
                                    <button className="btn btn-danger btn-sm w-100 mb-1" onClick={() => handleDelete(p.projectId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {setPageSize(newSize);
            setPageNum(1);
            }}

            />
            
        </div>
    )
}

export default AdminProjectsPage;