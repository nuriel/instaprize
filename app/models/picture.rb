class Picture < ActiveRecord::Base
  has_many :votes, :dependent => :destroy
  attr_accessible :thumb_url, :title, :url, :user
  
  # expects one instagram image object and return the created/found picture object
  def find_or_create_from_instagram
    
  end
end