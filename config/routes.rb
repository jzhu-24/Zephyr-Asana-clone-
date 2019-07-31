Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # ??? clean up routes

  namespace :api, defaults: { format: :json } do
    resources :users
    resource :session, only: [:create, :destroy]
    resources :project_favorites
    resources :workspaces do
      resources :projects, shallow: true do
        resources :columns, shallow: true do
          resources :tasks, shallow: true
        end
      end
    end
  end

  root to: 'static_pages#root'
end
