class CreateAddIndexOnProjectFavorites < ActiveRecord::Migration[5.2]
  def change
    add_index :project_favorites, [:project_id, :user_id], unique: true
  end
end
