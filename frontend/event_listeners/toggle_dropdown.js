export const toggleDropdown = e => {
  const { target } = e;
  const projectId = e.target.classList[1];
  const projectElement = document.getElementsByClassName(`project ${projectId}`)[0];
  const currentDropdown = document.getElementsByClassName('show')[0];
  const currentProjectHover = document.getElementsByClassName('projectHover')[0];
  const classNames = ['project-ellipsis', 'nav-project-ellipsis', 'user-dropdown'];

  if (target.children[0] === currentDropdown && classNames.includes(target.classList[0])) {
    target.children[0].classList.toggle('show');
    if (projectElement && target.classList[0] === 'project-ellipsis') projectElement.classList.toggle('projectHover');
  } else {
    currentProjectHover && currentProjectHover.classList.remove('projectHover');
    currentDropdown && currentDropdown.classList.remove('show');
    
    if (classNames.includes(target.classList[0])) {
      target.children[0].classList.add('show');
      if (projectElement && target.classList[0] === 'project-ellipsis') projectElement.classList.add('projectHover');
    }
  }
}