class Task < ApplicationRecord
  
  belongs_to :column
  # belongs_to :parent_task, class_name: 'Task', optional: true
  # has_many :subtasks, class_name: 'Task'

end
