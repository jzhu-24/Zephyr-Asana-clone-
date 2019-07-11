class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.integer :creator_id, null: false
      t.integer :owner_id
      t.integer :column_id, null: false
      t.integer :task_id
      t.integer :subtask, array: true, default: []
      t.boolean :completed, default: false
      t.date :due_date
      t.timestamps
    end

    add_index :tasks, :creator_id
    add_index :tasks, :owner_id
    add_index :tasks, :column_id
    add_index :tasks, :task_id
  end
end
