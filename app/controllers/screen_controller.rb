class ScreenController < ApplicationController
  respond_to :json, :html
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @instagram_user = client.user
    
    gon.instagram_user = @instagram_user
    gon.pics = client.tag_recent_media('mazeh9art')
    gon.votes = Vote.all
    
  end
  
  def admin
    
    
  end
  
end