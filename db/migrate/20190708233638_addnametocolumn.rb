class Addnametocolumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :columns, :column, :tasks
  end
end
