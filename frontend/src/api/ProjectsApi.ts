import { Project } from "../types/Project";

interface fetchProjectResponse {
    projects: Project[];
    totalNumProjects: number;

}

const API_URL = 'https://waterprojectbackendbutikofer.azurewebsites.net/Water'

export const fetchProjects = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]

): Promise<fetchProjectResponse> => {
    try{
        const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&')
            const response = await fetch(`${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`, 
                {credentials: 'include'}
            );

            if (!response.ok) {
                throw new Error('Failed to fetch projects')
            }
            
            return await response.json();
    } catch (error) {
        console.error('Error fetching projects', error)
        throw error
    }
};

export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/AddProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};

export const updateProject = async (projectId: number, updatedProject: Project) : Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        });

        return await response.json();

    } catch (error) {
        console.error("Failed to update the project: ", error);
        throw error;
    }
}

export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, 
            {method: 
                'DELETE'
            }
        );
        if (!response.ok) {
            throw new Error('Failed to delete project')
        
        }

    } catch (error) {
        console.error('Error deleting project: ', error);
        throw error;
    }
}