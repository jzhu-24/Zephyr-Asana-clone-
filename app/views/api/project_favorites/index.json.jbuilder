@project_favorites.each do |project_favorite|
  json.set! project_favorite.id do
    json.partial! 'project_favorite', project_favorite: project_favorite
  end
end