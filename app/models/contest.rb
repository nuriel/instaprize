class Contest < ActiveRecord::Base
  has_many :pictures
  attr_accessible :current_state, :title, :current_picture
  
  def getNextPictures
    if current_picture.nil? || current_picture == 0 
      pictures = Picture.where(voted: false)
      if pictures.count > 0
        self.current_picture = pictures.order("created_at desc").first.id
      end
    else
      picture = Picture.find(current_picture)
      picture.update_attribute(voted: true)
      picture.save
    end
    
    pictures = Picture.where(voted: false).order("created_at desc").limit(10)
    
    if (pictures.count == 0)
      Picture.update_all({:voted => true})
      pictures = Picture.where(voted: false).order("created_at desc").limit(10)
    end
    
    pictures
  end
end
