class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :text
      t.integer :creator_id, null: false
      t.integer :owner_id
      t.string :color, default: "red"
      t.string :view, default: "board"
      t.integer :column, array: true, default: []
      t.timestamps
    end

    add_index :projects, :creator_id
    add_index :projects, :owner_id
  end
end