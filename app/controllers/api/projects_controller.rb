class Api::ProjectsController < ApplicationController

  def index
    # ??? .includes for performance?
    @projects = Project.includes(columns: [:tasks])
  end

  def create
    # ??? must add IDs from params
    @project = Project.new(project_params)
    @project.workspace_id = params[:workspace_id]
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
    # needed to allow arrays lol
    params.require(:project).permit!
  end
end
