class ScreenController < ApplicationController
  layout 'big_screen'
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    
    gon.pics = client.tag_recent_media('mazeh9art')
    
    #greenpeacetrees
    # @pics = Instagram
  end

  def result
  end
end
