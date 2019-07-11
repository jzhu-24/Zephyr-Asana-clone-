# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  Workspace.destroy_all
  Project.destroy_all
  Column.destroy_all
  Task.destroy_all


  User.create(first_name: "Demo", last_name: "User", email: "demo_user@gmail.com", password: "password")
  User.create(first_name: "Julian", last_name: "Zhu", email: "julian_zhu90@gmail.com", password: "password")
  Workspace.create(name: "Engineering")
  Workspace.create(name: "Customer Success")
  Workspace.create(name: "Product")
  Project.create(name: "Zephyr", creator_id: User.first.id, workspace_id: Workspace.first.id)
  Project.create(name: "Falcon Practice", creator_id: User.first.id, workspace_id: Workspace.first.id)
  Column.create(name: "Planning", project_id: Project.first.id)
  Column.create(name: "In-progress", project_id: Project.first.id)
  Column.create(name: "Completed", project_id: Project.first.id)
  Task.create(name: "Build user profiles", creator_id: User.first.id, column_id: Column.first.id)
  Task.create(name: "Setup Jira", creator_id: User.first.id, column_id: Column.first.id)
  Task.create(name: "Hire more senior devs", creator_id: User.first.id, column_id: Column.first.id)
  Project.first.add_column(Column.all[0].id)
  Project.first.add_column(Column.all[1].id)
  Project.first.add_column(Column.all[2].id)
  Column.first.add_task(Task.all[0].id)
  Column.first.add_task(Task.all[1].id)
  Column.first.add_task(Task.all[2].id)
end