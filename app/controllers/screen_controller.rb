class ScreenController < ApplicationController
  respond_to :json, :html
  
  def index
    redirect_to :controller => 'sessions', :action => 'connect' if !session[:access_token] 

    client = Instagram.client(:access_token => session[:access_token])
    @user = client.user
    
    
    gon.user = @user
    gon.pics = client.tag_recent_media('mazeh9art')
    gon.votes = Vote.all
    
  end
  
  def admin
    @pictures = Contest.first.getNextPictures()

    if @pictures.blank?
      Picture.where(:voted => true).update_all(:voted => false)
      Contest.first.current_picture = 0
      Contest.first.save()
      @pictures = Contest.first.getNextPictures()
    else 
      @pictures.first.voted = true
      @pictures.first.save()
    end
    
    @pictures
  end
  
end