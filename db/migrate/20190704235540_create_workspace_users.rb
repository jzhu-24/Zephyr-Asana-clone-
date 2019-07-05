class CreateWorkspaceUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :workspace_users do |t|
      t.integer :workspace_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :workspace_users, [:workspace_id, :user_id], unique: true
  end
end
