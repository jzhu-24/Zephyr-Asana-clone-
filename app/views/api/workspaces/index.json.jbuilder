@workspaces.each do |workspace|
  json.set! workspace.id do
    json.partial! 'workspace', workspace: workspace
  end
end