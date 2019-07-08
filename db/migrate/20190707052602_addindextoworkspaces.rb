class Addindextoworkspaces < ActiveRecord::Migration[5.2]
  def change
    add_index :workspaces, :name, unique: true
  end
end
