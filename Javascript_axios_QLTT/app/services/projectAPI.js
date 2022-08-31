function apiGetProjects(){
    return axios({
        url: "https://6309c67ef8a20183f7769d18.mockapi.io/project",
        method: "GET",
    })
};
function apiAddProject(project){
    return axios({
        url: "https://6309c67ef8a20183f7769d18.mockapi.io/project",
        method: "POST",
        data: project,
    })
};
function apiDeleteProject(projectId) {
    return axios({
      url: `https://6309c67ef8a20183f7769d18.mockapi.io/project/${projectId}`,
      method: "DELETE",
      
    });
}
function apiGetProjectById(projectId) {
    return axios({
      url: `https://6309c67ef8a20183f7769d18.mockapi.io/project/${projectId}`,
      method: "GET",
    });
}
function apiUpdateProject(projectId, project) {
    return axios({
      url: `https://6309c67ef8a20183f7769d18.mockapi.io/project/${projectId}`,
      method: "PUT",
      data: project
    });
}