class Workspace < ApplicationRecord
  # ??? must add validations for errors to render
  validates :name, presence: true, uniqueness: true
  
end
