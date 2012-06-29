class Vote < ActiveRecord::Base
  belongs_to :picture
  attr_accessible :comment, :vote_index
  
end
