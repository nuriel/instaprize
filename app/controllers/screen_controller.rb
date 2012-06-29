class ScreenController < ApplicationController
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    
    state = 1
    
    gon.state = state
    gon.pics = client.tag_recent_media('mazeh9art')
    gon.votes = Picture.limit(10)
    
    #greenpeacetrees
    # @pics = Instagram
  end

  def result
  end
end
