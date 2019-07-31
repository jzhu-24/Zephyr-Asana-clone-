class CreateProjectFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :project_favorites do |t|
      t.integer :project_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
