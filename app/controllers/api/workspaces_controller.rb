class Api::WorkspacesController < ApplicationController

  # ??? status codes?

  def index
    @workspaces = Workspace.all
  end

  def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.save
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
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
    params.require(:workspace).permit(:name)
  end
end
