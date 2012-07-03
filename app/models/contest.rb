class Contest < ActiveRecord::Base
  has_many :pictures
  attr_accessible :current_state, :title
  
  def getNextPictures
    if current_picture == 0 
      self.current_picture = Picture.all.first.id
    else
      Picture.find(current_picture).voted = true
    end
    
    Picture.where(voted: false).order("created_at desc").limit(10)      
  end
end
