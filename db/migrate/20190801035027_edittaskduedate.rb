class Edittaskduedate < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :due_date, :datetime
  end
end
