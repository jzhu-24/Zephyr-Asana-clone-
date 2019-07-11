class Api::ProjectsController < ApplicationController

  def index
    # @projects = Project.all
    @projects = Project.includes(columns: [:tasks])
  end

  def create
    # ??? must add IDs from params
    @project = Project.new(project_params)
    @project.workspace_id = params[:workspace_id]

    if @project.save
      render :show
    else
      render json: @project.errors.full_messages, status: 401
    end
  end

  def show
    @project = Project.find_by(id: params[:id])
  end

  def update
    @project = Project.find_by(id: params[:id])
    @project.column_will_change!
    if @project.update_attributes(project_params)
      render :update
    else
      render json: @project.errors.full_messages, status: 422
    end
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
