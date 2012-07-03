class Picture < ActiveRecord::Base
  has_many :votes, :dependent => :destroy
  belongs_to :contest
  attr_accessible :thumb_url, :title, :url, :user, :voted
  
end
