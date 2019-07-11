class Changecolumns < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects, :columns, :column
    rename_column :columns, :tasks, :task
  end
end
