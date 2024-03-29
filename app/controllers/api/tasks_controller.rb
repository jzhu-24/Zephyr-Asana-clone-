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
    @task.subtask_will_change!
    @task.update_attributes(task_params)
    render :update
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    @task.destroy
  end

  private

  def task_params
    params.require(:task).permit!
  end
end