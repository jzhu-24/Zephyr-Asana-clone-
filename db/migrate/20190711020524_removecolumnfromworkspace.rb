class Removecolumnfromworkspace < ActiveRecord::Migration[5.2]
  def change
    remove_column :workspaces, :project_id
  end
end
