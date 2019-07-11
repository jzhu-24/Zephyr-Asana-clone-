class CreateColumns < ActiveRecord::Migration[5.2]
  def change
    create_table :columns do |t|
      t.string :name, null: false
      t.integer :project_id, null: false
      t.integer :column, array: true, default: []
      t.timestamps
    end

    add_index :columns, :project_id
  end
end
