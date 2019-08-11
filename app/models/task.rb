class Task < ApplicationRecord
  
  belongs_to :column
  has_many :subtasks, class_name: 'Task', foreign_key: "task_id"
  belongs_to :parent_task, class_name: 'Task', optional: true

  

end
