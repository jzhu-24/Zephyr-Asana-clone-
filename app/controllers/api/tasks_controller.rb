class Api::TasksController < ApplicationController

  def index
    @tasks = Column.find_by(id: params[:column_id]).project.tasks
  end

  def create
    @task = Task.new(task_params)
    @task.column_id = @task.column_id
    @task.creator_id = current_user.id

    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 401
    end
  end

  def show
    @task = Task.find_by(id: params[:id])
  end

  def update
    @task = Task.find_by(id: params[:id])
    if @task.update_attributes(task_params)
      render :update
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    @task.destroy
  end

  private

  def task_params
    params.require(:task).permit(:id, :name, :description, :creator_id, :owner_id, :column_id, :task_id, :subtask, :completed)
  end
end