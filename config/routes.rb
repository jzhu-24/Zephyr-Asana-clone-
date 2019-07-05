Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # ??? clean up routes

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :workspaces
    resources :users
    
    # post '/search', to: 'users#search'
    # resources :chirps
    # resources :likes, only: [:create]
    # delete '/likes', to: 'likes#destroy'
    # resources :follows, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end
