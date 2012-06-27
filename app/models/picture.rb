class Picture < ActiveRecord::Base
  attr_accessible :thumb_url, :title, :url, :user
end
