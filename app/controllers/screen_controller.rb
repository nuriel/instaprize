class ScreenController < ApplicationController
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    
    state = 1
    
    gon.state = state
    
    gon.user = @user
    gon.pics = client.tag_recent_media('mazeh9art')
    gon.votes = Vote.all
    
  end

  def result
  end
end
