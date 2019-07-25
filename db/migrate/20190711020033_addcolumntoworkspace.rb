class Addcolumntoworkspace < ActiveRecord::Migration[5.2]
  def change
    add_column :workspaces, :project_id, :integer, null: false
  end
end
