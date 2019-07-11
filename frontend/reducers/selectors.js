export const selectProjects = ({ projects }, workspaceId) => {
  return Object.values(projects).filter(
    project => project.workspaceId === workspaceId
  );
};

export const selectCurrentProject = ({ projects }, projectId) => {
  return projects[projectId];
};
