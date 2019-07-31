class Workspace < ApplicationRecord
  # ??? must add validations for errors to render
  validates :name, presence: true, uniqueness: true
  has_many :projects
  has_many :project_favorites, through: :projects

end
