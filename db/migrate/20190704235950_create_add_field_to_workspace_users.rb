class CreateAddFieldToWorkspaceUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :workspace_users, :user_id, unique: true
  end
end
