class CreateAddFieldToWorkspaceUser2s < ActiveRecord::Migration[5.2]
  def change
    remove_index :workspace_users, :user_id
    add_index :workspace_users, :user_id, unique: false
  end
end
