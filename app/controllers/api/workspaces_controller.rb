class Api::WorkspacesController < ApplicationController

  # ??? status codes?

  def index
    # @workspaces = Workspace.all
    @workspaces = Workspace.includes(projects: [{ columns: [:tasks] }])
  end

  def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.save
      render :show
    else
      render json: ['Workspace already exists.'], status: 401
    end
  end

  def show
    @workspace = Workspace.find_by(id: params[:id])
  end

  def update
    @workspace = Workspace.find_by(id: params[:id])
    if @workspace.update_attributes(workspace_params)
      render :update
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace = Workspace.find_by(id: params[:id])
    @workspace.destroy
  end

  private

  def workspace_params
    params.require(:workspace).permit(:id, :name)
  end
end
