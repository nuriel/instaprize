class ScreenController < ApplicationController
  respond_to :json, :html
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    
    state = 1
    
    gon.state = Contest.first.current_state
    
    gon.user = @user
    gon.pics = client.tag_recent_media('mazeh9art')
    gon.votes = Vote.all
    
  end
  
  def admin
    
    
  end
  
end