class Project < ApplicationRecord

  validates :name, :creator_id, presence: true
  
  belongs_to :workspace
  has_many :columns

  attr_writer :columns

  # model.array_will_change!

  def add_column(column_id)
    self.column_will_change!
    self.column.push(column_id)
    self.save
  end

  def move_column(old_idx, new_idx)
    self.column_will_change!
    self.column.insert(new_idx, self.column.delete_at(old_idx))
    self.save
  end
end
