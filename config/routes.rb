Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # ??? clean up routes

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :workspaces do
      resources :projects, shallow: true do
        resources :columns, shallow: true do
          resources :tasks, shallow: true
        end
      end
    end
    resources :users
  end

  root to: 'static_pages#root'
end
