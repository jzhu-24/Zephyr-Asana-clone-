class Api::ProjectsController < ApplicationController

  def index
    @projects = Workspace.find_by(id: params[:workspace_id]).projects
  end

  def create
    @project = Project.new(project_params)
    @project.creator_id = current_user.id
    @project.save
    render :show
  end

  def show
    @project = Project.find_by(id: params[:id])
  end

  def update
    @project = Project.find_by(id: params[:id])
    @project.column_will_change!
    project_params[:column] = [] unless project_params[:column]
    @project.update_attributes(project_params)
    render :update
  end

  def destroy
    @project = Project.find_by(id: params[:id])
    @project.destroy
  end

  private

  def project_params
    params.require(:project).permit!
  end
end
