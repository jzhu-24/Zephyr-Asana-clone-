class Api::ProjectFavoritesController < ApplicationController
    def index
        @project_favorites = Workspace.find_by(id: params[:workspace_id]).project_favorites.where("user_id = #{current_user.id}")
    end
    
    def create
        @project_favorite = ProjectFavorite.new
        @project_favorite.project_id = params[:project_id]
        @project_favorite.user_id = current_user.id
        @project_favorite.save
        render :show
    end

    def destroy
        @project_favorite = ProjectFavorite.find_by(id: params[:id])
        @project_favorite.destroy
    end
end
