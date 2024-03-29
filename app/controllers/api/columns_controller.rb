class Api::ColumnsController < ApplicationController

  def index
    @columns = Project.find_by(id: params[:project_id]).columns
  end

  def create
    @column = Column.new(column_params)

    if @column.save
      render :show
    else
      render json: @column.errors.full_messages, status: 401
    end
  end

  def show
    @column = Column.find_by(id: params[:id])
  end

  def update
    @column = Column.find_by(id: params[:id])
    @column.task_will_change!
    @column.update_attributes(column_params)
    @column.task = [] unless column_params[:task]
    @column.save!
    render :update
  end

  def destroy
    @column = Column.find_by(id: params[:id])
    @column.destroy
  end

  private

  def column_params
    params.require(:column).permit!
  end
end