class Fixcolumnname2 < ActiveRecord::Migration[5.2]
  def change
    rename_column :projects, :text, :description
  end
end
