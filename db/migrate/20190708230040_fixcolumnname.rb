class Fixcolumnname < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects, :column, :columns
  end
end
