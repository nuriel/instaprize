class Contest < ActiveRecord::Base
  has_many :pictures
  attr_accessible :current_state, :title
end
