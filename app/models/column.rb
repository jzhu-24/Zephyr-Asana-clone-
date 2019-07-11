class Column < ApplicationRecord

  validates :name, :project_id, presence: true
  has_many :tasks
  belongs_to :project

  def add_task(task_id)
    self.task_will_change!
    self.task.push(task_id)
    self.save
  end

  def move_task(old_idx, new_idx)
    self.task_will_change!
    self.task.insert(new_idx, self.task.delete_at(old_idx))
    self.save
  end

end
