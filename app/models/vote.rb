class Vote < ActiveRecord::Base
  belongs_to :picture
  attr_accessible :comment, :vote_index
  
  OPTIONS = [
    { name: "dontlike", value: -1 },
    { name: "like", value: 1 },
    { name: "so-so", value: 0 },
  ]
end
