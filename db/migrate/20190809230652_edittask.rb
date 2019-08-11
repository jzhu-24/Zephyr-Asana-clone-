class Edittask < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :column_id, :integer, null: true
  end
end
